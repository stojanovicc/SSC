using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{
    public Context Context { get; set; }
    public UserManager<ApplicationUser> UserManager { get; set; }
    public AccountController(Context dbContext, UserManager<ApplicationUser> userManager)
        {
            Context = dbContext;
            UserManager = userManager;
        }

    [HttpGet("GetUsers")]
    [Authorize(Roles = "Administrator, Student, Trener, Zaposleni")]
    public async Task<JsonResult> GetUsers(string searchParam)
    {
        searchParam = searchParam.ToLower();
        return new JsonResult(new
        {
            succeeded = true,
            users = await Context.Students.Select(s => new { Id = s.Id, UserName = s.UserName, Name = s.Ime + " " + s.Prezime, Picture = s.Slika })
                .Union(Context.Treners.Select(s => new { Id = s.Id, UserName = s.UserName, Name = s.ImeT + " " + s.PrezimeT, Picture = s.Slika }))
                .Union(Context.Zaposlenis.Select(s => new { Id = s.Id, UserName = s.UserName, Name = s.ImeZ + " " + s.PrezimeZ, Picture = s.Slika }))
                .Where(u => u.Name.ToLower().Contains(searchParam) || u.UserName.ToLower().Contains(searchParam))
                .Take(5)
                .ToListAsync()
        });
    }

    [HttpPut("EditStudent")]
    [Authorize(Roles = "Student, Administrator")]
    public async Task<JsonResult> EditStudent(string firstName, string lastName, string picture)
    {
        try
        {
            var logged = await UserManager.GetUserAsync(User);
            var student = await Context.Students
            .Where(u => u.Id == logged.Id)
            .FirstOrDefaultAsync();

            if (student != null)
            {
                if (!string.IsNullOrWhiteSpace(firstName))
                    student.Ime = firstName;
                if (!string.IsNullOrWhiteSpace(lastName))
                    student.Prezime = lastName;
                if (!string.IsNullOrWhiteSpace(picture))
                    student.Slika = picture;
                Context.Students.Update(student);
                await Context.SaveChangesAsync();
            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Student Nije Pronadjen!" });
            }

            return new JsonResult(new { succeeded = true, data = new { name = firstName, lastName, picture } });
        }
        catch (Exception e)
        {
            return new JsonResult(new { succeeded = false, errors = e.Message });
        }
    }

    [HttpPut("EditTrener")]
    [Authorize(Roles = "Trener, Administrator")]
    public async Task<JsonResult> EditEmployer(string firstName, string lastName, string picture)
    {
        try
        {
            var logged = await UserManager.GetUserAsync(User);
            var trener = await Context.Treners
                                      .Where(u => u.Id == logged.Id)
                                      .FirstOrDefaultAsync();

            if (trener != null)
            {
                if (!string.IsNullOrWhiteSpace(firstName))
                    trener.ImeT = firstName;
                if (!string.IsNullOrWhiteSpace(lastName))
                    trener.PrezimeT = lastName;
                if (!string.IsNullOrWhiteSpace(picture))
                    trener.Slika = picture;
                Context.Treners.Update(trener);
                await Context.SaveChangesAsync();
            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Trener Nije Pronadjen!" });
            }

            return new JsonResult(new { succeeded = true, data = new { name = firstName, lastName, picture } });
        }
        catch (Exception e)
        {
            return new JsonResult(new { succeeded = false, errors = e.Message });
        }
    }

    [HttpPut("EditZaposleni")]
    [Authorize(Roles = "Zaposleni, Administrator")]
    public async Task<JsonResult> EditZaposleni(string firstName, string lastName, string picture)
    {
        try
        {
            var logged = await UserManager.GetUserAsync(User);
            var zaposleni = await Context.Zaposlenis
                                      .Where(u => u.Id == logged.Id)
                                      .FirstOrDefaultAsync();

            if (zaposleni != null)
            {
                if (!string.IsNullOrWhiteSpace(firstName))
                    zaposleni.ImeZ = firstName;
                if (!string.IsNullOrWhiteSpace(lastName))
                    zaposleni.PrezimeZ = lastName;
                if (!string.IsNullOrWhiteSpace(picture))
                    zaposleni.Slika = picture;
                Context.Zaposlenis.Update(zaposleni);
                await Context.SaveChangesAsync();
            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Zaposleni Nije Pronadjen!" });
            }

            return new JsonResult(new { succeeded = true, data = new { name = firstName, lastName, picture } });
        }
        catch (Exception e)
        {
            return new JsonResult(new { succeeded = false, errors = e.Message });
        }
    }
/*
    [HttpGet("GetApplications/{username}")]
    [Authorize(Roles = "Administrator")]
    public async Task<JsonResult> GetApplications(string username)
    {
        try
        {
            var applications = await Context.Students
                .Where(s => s.UserName == username)
                .Include(s => s.Sport)
                .ThenInclude(a => a.Takmicenjes)
                .ThenInclude(i => i.Employer)
                .Select(a => new
                {
                    Name = a.FirstName + " " + a.LastName,
                    a.Id,
                    Applications = a.InternshipApplications.Select(x => new
                    {
                        x.ID,
                        x.Internship.Title,
                        x.Internship.Employer.CompanyName,
                        x.Status
                    })
                })
                .FirstOrDefaultAsync();

                return new JsonResult(new { succeeded = true, applications });
            }
            catch (Exception e)
            {
                return new JsonResult(new { succeeded = false, errors = e.Message });
            }
        }
//mislim da nama ova metoda ne treba
/*
        [Route("GetApplications/{studentId}/{applicationId}/{newStatus}")]
        [HttpPut]
        [Authorize(Roles = " Admin")]
        public async Task<JsonResult> ChangeStatus(string studentId, int applicationId, string newStatus)
        {
            try
            {
                if (newStatus != "Applied" && newStatus != "Finished" && newStatus != "Denied" && newStatus != "Accepted")
                {
                    return new JsonResult(new { succeeded = false, errors = "Invalid status" });
                }

                var student = await Context.Students
                .Where(s => s.Id == studentId)
                .Include(s => s.InternshipApplications)
                .FirstOrDefaultAsync();

                if (student != null)
                {
                    var application = student.InternshipApplications.Where(a => a.ID == applicationId).FirstOrDefault();
                    if (application != null)
                    {
                        application.Status = newStatus;
                        await Context.SaveChangesAsync();
                        return new JsonResult(new { succeeded = true });
                    }
                }
                return new JsonResult(new { succeeded = false, errors = "Status not changed" });


            }
            catch (Exception e)
            {
                return new JsonResult(new { succeeded = false, errors = e.Message });
            }
        }
*/
/*
    [Route("GetApplicationsStatistics")]
    [HttpGet]
    [Authorize(Roles = " Admin")]
    public JsonResult GetApplicationsStatistics()
    {
        try
        {
            var applications = Context.InternshipApplication;
            return new JsonResult(new
            {
                succeeded = true,
                statistics =
                    new
                    {
                        Applied = applications.Where(a => a.Status == "Applied").Count(),
                        Finished = applications.Where(a => a.Status == "Finished").Count(),
                        Accepted = applications.Where(a => a.Status == "Accepted").Count(),
                        Denied = applications.Where(a => a.Status == "Denied").Count(),
                    }
            });
        }
        catch (Exception e)
        {
            return new JsonResult(new { succeeded = false, errors = e.Message });
        }
    }
*/
}