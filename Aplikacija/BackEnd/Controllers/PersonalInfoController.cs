using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PersonalInfoController : ControllerBase
    {

        public Context Context { get; set; }

        public UserManager<ApplicationUser> UserManager { get; set; }
        public PersonalInfoController(Context dbContext, UserManager<ApplicationUser> userManager)
        {
            Context = dbContext;
            UserManager = userManager;
        }

        [HttpPost]
        [Route("AddFakultet")]
        [Authorize(Roles = "Student, Administrator")]
        public async Task<JsonResult> AddFakultet(string nazivFakulteta, string grad, string univerzitet)
        {
            var logged = await UserManager.GetUserAsync(User);
            var student = await Context.Students
            .Where(u => u.Id == logged.Id)
            .Include(u => u.PersonalInfoStudent)
            .ThenInclude(u => u.Fakultets)
            .FirstOrDefaultAsync();
            
            if (student != null)
            {
                student.PersonalInfoStudent.Fakultets.Add(new Fakultet
                {
                    NazivFakulteta = nazivFakulteta,
                    Grad = grad,
                    Univerzitet = univerzitet,
                    PersonalInfoStudent = student.PersonalInfoStudent
                });
                await Context.SaveChangesAsync();

                return new JsonResult(new { succeeded = true });
            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Student Not Found" });
            }

        }

        [HttpPost]
        [Route("AddSport")]
        [Authorize(Roles = "Student, Administrator, Trener, Zaposleni")]
        public async Task<JsonResult> AddSport(string naziv)
        {
            var sport = new Sport
            {
                Naziv = naziv
            };
            await Context.Sports.AddAsync(sport);
            await Context.SaveChangesAsync();
            return new JsonResult(new { succeeded = true });
        }

        [HttpGet]
        [Route("GetSports")]
        [Authorize(Roles = "Student, Administrator, Trener, Zaposleni")]
        public async Task<JsonResult> GetSports()
        {
            return new JsonResult(new
            {
                succeeded = true,
                sports = await Context.Sports.Select(s => new
                {
                    s.ID,
                    Label = s.Naziv
                })
                .ToListAsync()
            });

        }

        [HttpPost]
        [Route("AddSportToPersonalInfoStudent")]
        [Authorize(Roles = "Student, Administrator")]
        public async Task<JsonResult> AddSportToPersonalInfoStudent(string naziv)
        {
            var sport = await Context.Sports
                .Where(s => s.Naziv == naziv)
                .Include(u => u.PersonalInfoStudents)
                .FirstOrDefaultAsync();
            if (sport == null)
            {
                return new JsonResult(new { succeeded = false, error = "Sport Not Found" });
            }

            var logged = await UserManager.GetUserAsync(User);
            var student = await Context.Students
                                        .Where(u => u.Id == logged.Id)
                                        .Include(u => u.PersonalInfoStudent)
                                        .ThenInclude(u => u.Sports)
                                        .FirstOrDefaultAsync();
        
            if (student != null)
            {
                student.PersonalInfoStudent.Sports.Add(sport);
                sport.PersonalInfoStudents.Add(student.PersonalInfoStudent);

                await Context.SaveChangesAsync();
                return new JsonResult(new { succeeded = true });
            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Student Not Found" });
            }
        }

        [HttpPost]
        [Route("AddSportToPersonalInfoTrener")]
        [Authorize(Roles = "Trener, Administrator")]
        public async Task<JsonResult> AddSportToPersonalInfoTrener(string naziv)
        {
            var sport = await Context.Sports
                .Where(s => s.Naziv == naziv)
                .Include(u => u.PersonalInfoTreners)
                .FirstOrDefaultAsync();
            if (sport == null)
            {
                return new JsonResult(new { succeeded = false, error = "Sport Not Found" });
            }

            var logged = await UserManager.GetUserAsync(User);
            var trener = await Context.Treners
                                        .Where(u => u.Id == logged.Id)
                                        .Include(u => u.PersonalInfoTrener)
                                        .ThenInclude(u => u.Sports)
                                        .FirstOrDefaultAsync();
            
            if (trener != null)
            {
                trener.PersonalInfoTrener.Sports.Add(sport);
                sport.PersonalInfoTreners.Add(trener.PersonalInfoTrener);

                await Context.SaveChangesAsync();
                return new JsonResult(new { succeeded = true });
            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Trener Not Found" });
            }
        }

        [HttpPost]
        [Route("CreatePersonalInfoStudent")]
        [Authorize(Roles = "Student, Administrator")]
        public async Task<JsonResult> CreatePersonalInfoStudent(PersonalInfoStudentModel cv)
        {

            await DeletePersonalInfo();
            var logged = await UserManager.GetUserAsync(User);
            var student = await Context.Students
            .Where(u => u.Id == logged.Id)
            .Include(u => u.PersonalInfoStudent)
            .ThenInclude(c => c.Fakultets)
            .Include(u => u.PersonalInfoStudent)
            .ThenInclude(c => c.Sports)
            .FirstOrDefaultAsync();

            if (student == null)
            {
                return new JsonResult(new { succeeded = false, errors = "Student Not Found" });
            }

            student.PersonalInfoStudent.Address = cv.Address;
            student.PersonalInfoStudent.City = cv.City;
            student.PersonalInfoStudent.PhoneNumber = cv.Phone;

            foreach (var fakultet in cv.Fakultet)
            {
                student.PersonalInfoStudent.Fakultets.Add(new Fakultet
                {
                    NazivFakulteta = fakultet.NazivFakulteta,
                    Grad = fakultet.Grad,
                    Univerzitet = fakultet.Univerzitet,
                    PersonalInfoStudent = student.PersonalInfoStudent
                });
            }
            foreach (var sport in cv.Sports)
            {
                var sportData = await Context.Sports
                .Where(s => s.Naziv == sport.Label)
                .Include(u => u.PersonalInfoStudents)
                .FirstOrDefaultAsync();
                if (sportData != null)
                {
                    student.PersonalInfoStudent.Sports.Add(sportData);
                    sportData.PersonalInfoStudents.Add(student.PersonalInfoStudent);
                }

            }
            await Context.SaveChangesAsync();
            return new JsonResult(new { succeeded = true });
        }

        [HttpPost]
        [Route("CreatePersonalInfoTrener")]
        [Authorize(Roles = "Trener, Administrator")]
        public async Task<JsonResult> CreatePersonalInfoTrener(PersonalInfoTrenerModel cv)
        {
            await DeletePersonalInfoTrener();
            var logged = await UserManager.GetUserAsync(User);
            var trener = await Context.Treners
            .Where(u => u.Id == logged.Id)
            .Include(u => u.PersonalInfoTrener)
            .ThenInclude(c => c.Sports)
            .FirstOrDefaultAsync();

            if (trener == null)
            {
                return new JsonResult(new { succeeded = false, errors = "Trener Not Found" });
            }

            trener.PersonalInfoTrener.Address = cv.Address;
            trener.PersonalInfoTrener.City = cv.City;
            trener.PersonalInfoTrener.PhoneNumber = cv.Phone;

            foreach (var sport in cv.Sports)
            {
                var sportt = await Context.Sports
                .Where(s => s.Naziv == sport.Label)
                .Include(u => u.PersonalInfoTreners)
                .FirstOrDefaultAsync();
                if (sportt != null)
                {
                    trener.PersonalInfoTrener.Sports.Add(sportt);
                    sportt.PersonalInfoTreners.Add(trener.PersonalInfoTrener);
                }

            }
            await Context.SaveChangesAsync();
            return new JsonResult(new { succeeded = true });
        }

        [HttpPost]
        [Route("GetPersonalInfoStudent")]
        public async Task<JsonResult> GetPersonalInfoStudent(string? studentId = "")
        {
            var logged = await UserManager.GetUserAsync(User);
            if (studentId != null && studentId != "")
                logged = null;
            var student = await Context.Students
            .Where(u => u.Id == (logged != null ? logged.Id : studentId))
            .Include(u => u.PersonalInfoStudent)
            .ThenInclude(c => c.Fakultets)
            .Include(u => u.PersonalInfoStudent)
            .ThenInclude(c => c.Sports)
            .FirstOrDefaultAsync();

            if (student == null)
            {
                return new JsonResult(new { succeeded = false, errors = "Student Not Found" });
            }

            return new JsonResult(new
            {
                succeeded = true,
                cv =
                new
                {
                    UserName = student.UserName,
                    Name = student.Ime,
                    LastName = student.Prezime,
                    Picture = student.Slika,
                    Email = student.Email,
                    Phone = logged!=null?student.PersonalInfoStudent.PhoneNumber:"",
                    Address = logged!=null?student.PersonalInfoStudent.Address:"",
                    City = logged!=null?student.PersonalInfoStudent.City:"",
                    Fakultet = student.PersonalInfoStudent.Fakultets.Select(e => new { e.NazivFakulteta, e.Grad, e.Univerzitet }),
                    Sports = student.PersonalInfoStudent.Sports.Select(s => new { s.ID, Label = s.Naziv })
                }
            });
        }

        [HttpDelete]
        [Route("DeletePersonalInfo")]
        [Authorize(Roles = "Student, Administrator")]
        public async Task<JsonResult> DeletePersonalInfo()
        {
            var logged = await UserManager.GetUserAsync(User);
            var student = await Context.Students
            .Where(u => u.Id == logged.Id)
            .Include(u => u.PersonalInfoStudent)
            .ThenInclude(c => c.Fakultets)
            .Include(u => u.PersonalInfoStudent)
            .ThenInclude(c => c.Sports)
            .FirstOrDefaultAsync();

            if (student == null)
            {
                return new JsonResult(new { succeeded = false, errors = "Student Not Found" });
            }

            foreach (Fakultet exp in student.PersonalInfoStudent.Fakultets)
            {
                Context.Fakultets.Remove(exp);
            }
            student.PersonalInfoStudent.Sports.Clear();
            PersonalInfoStudent cv = student.PersonalInfoStudent;

            await Context.SaveChangesAsync();

            return new JsonResult(new
            {
                succeeded = true
            });
        }

        [HttpPost]
        [Route("GetPersonalInfoTrener")]
        public async Task<JsonResult> GetPersonalInfoTrener(string? trenerId = "")
        {
            var logged = await UserManager.GetUserAsync(User);
            if (trenerId != null && trenerId != "")
                logged = null;
            var trener = await Context.Treners
            .Where(u => u.Id == (logged != null ? logged.Id : trenerId))
            .Include(u => u.PersonalInfoTrener)
            .ThenInclude(c => c.Sports)
            .FirstOrDefaultAsync();

            if (trener == null)
            {
                return new JsonResult(new { succeeded = false, errors = "Trener Not Found" });
            }


            return new JsonResult(new
            {
                succeeded = true,
                cv =
                new
                {
                    UserName = trener.UserName,
                    Name = trener.ImeT,
                    LastName = trener.PrezimeT,
                    Picture = trener.Slika,
                    Email = trener.Email,
                    Phone = logged!=null?trener.PersonalInfoTrener.PhoneNumber:"",
                    Address = logged!=null?trener.PersonalInfoTrener.Address:"",
                    City = logged!=null?trener.PersonalInfoTrener.City:"",
                    Sports = trener.PersonalInfoTrener.Sports.Select(s => new { s.ID, Label = s.Naziv })
                }
            });
        }

        [HttpDelete]
        [Route("DeletePersonalInfoTrener")]
        [Authorize(Roles = "Trener, Administrator")]
        public async Task<JsonResult> DeletePersonalInfoTrener()
        {
            var logged = await UserManager.GetUserAsync(User);
            var trener = await Context.Treners
            .Where(u => u.Id == logged.Id)
            .Include(u => u.PersonalInfoTrener)
            .ThenInclude(c => c.Sports)
            .FirstOrDefaultAsync();

            if (trener == null)
            {
                return new JsonResult(new { succeeded = false, errors = "Trener Not Found" });
            }

            trener.PersonalInfoTrener.Sports.Clear();
            PersonalInfoTrener cv = trener.PersonalInfoTrener;

            await Context.SaveChangesAsync();

            return new JsonResult(new
            {
                succeeded = true
            });
        } 
    }
}