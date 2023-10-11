namespace WebTemplate.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Threading.Tasks;

[ApiController]
[Route("[controller]")]
public class StudentController : ControllerBase
{
    public Context Context { get; set; }
    public UserManager<ApplicationUser> UserManager { get; set; }
    public StudentController(Context context, UserManager<ApplicationUser> userManager)
    {
        Context = context;
        UserManager = userManager;
    }

    
    [HttpGet]
    [Route("GetStudents")]
    public async Task<JsonResult> GetStudents()
    {
        var students = await Context.Students
        //.Include(i => i.Sports)
        .ToListAsync();
        if (students != null)
        {
            return new JsonResult(new
            {
                succeeded = true,
                students = new
                {
                    Students = students.Select(emp => new
                    {
                        id = emp.Id,
                        emp.Ime,
                        emp.Prezime,
                        emp.Slika,
                        emp.Email,
                       // Ratings = emp.Ratings    ----> Sports = emp.Sports
                       // .Select(r => new { r.OverallScore }),
                    })
                }
            });
        }
        else
        {
            return new JsonResult(new
            {
                succeeded = false,
                error = "Student Not Found"
            });
        }
    }
//////////////////////////////////////////////////////////////////////////////////////////////
    [HttpPost("DodajStudenta")]
    public async Task<ActionResult> DodajStudenta([FromBody]Student student)
    {
        try
        {
            await Context.Students.AddAsync(student);
            await Context.SaveChangesAsync();
            return Ok($"ID novog studenta je = {student.Id}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("ObrisiStudenta/{id}")]
    public async Task<ActionResult> ObrisiStudenta(int id)
    {
        var student = await Context.Students.FindAsync(id);

        if (student != null)
        {
            string ime = student.Ime;
            string prezime = student.Prezime;
            
            Context.Students.Remove(student);
            await Context.SaveChangesAsync();
            return Ok($"Izbrisan je student sa imenom i prezimenom = {ime} {prezime} ");
        }
        else
        {
            return BadRequest("Neuspelo!");
        }
    }
    [HttpPut("AzurirajStudenta/{id}")]
    public async Task<ActionResult> AzurirajStudenta(int id, [FromBody]Student student)
    {
        var stari = await Context.Students.FindAsync(id);

        if (stari != null)
        {
            Context.Students.Update(stari);
            await Context.SaveChangesAsync();
            return Ok($"Azuriran je student sa ID = {stari.Id}");
        }
        else
        {
            return BadRequest("Neuspelo!");
        }
    }
    [HttpGet("PreuzmiStudente")]
    public async Task<ActionResult> PreuzmiStudente()
    {
        try
        {
            return Ok(await Context.Students.ToListAsync());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpPut("AzurirajSport/{idSporta}/{idStudenta}")]
    public async Task<ActionResult> AzurirajSport(int idSporta, int idStudenta)
    {
        var noviSport=await Context.Sports.FindAsync(idSporta);//sport kojim se zamenjuje stari
        var student=await Context.Students.FindAsync(idStudenta);
        try
        {
            //student!.Sport=noviSport;
            Context.Students.Update(student);
            await Context.SaveChangesAsync();
            return Ok($"Azuriran je sport studenta");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //dodato za TAKMICENJE
    //deo vezan za rpijavu za takmicenje na strani studenta
        [HttpGet]
        [Route("GetStudentInfo/{username}")]
        [Authorize(Roles = "Student, Trener")]
        public async Task<JsonResult> GetStudentInfo(string username)
        {
            var student = await Context.Students
            .Where(s => s.UserName == username)
            //.Include(s => s.Sport)
           // .ThenInclude(s => s.Naziv)
           // .Include(s => s.Fakultet)
          //  .ThenInclude(s => s.NazivFakulteta)
            .Include(s => s.Takmicenjes)
            .ThenInclude(s => s.NazivTakmicenja)
            .FirstOrDefaultAsync();

            if (student != null)
            {
                return new JsonResult(new
                {
                    succeeded = true,
                    student = new
                    {
                        student.Ime,
                        student.Prezime,
                        student.Slika,
                     //   student.Sport?.Naziv,
                        student.Takmicenjes,
                      //  student.Fakultet
                    }
                });
            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Student nije pronadjen" });
            }
        }
        //ova metoda RADI!
        [HttpPut]
        [Route("ApplyToTakmicenje/{takmicenjeId}")]//prijava za takmicenje, kasnije promeni, prvo fetchuj
        [Authorize(Roles = "Student, Administrator")]
        public async Task<JsonResult> ApplyToTakmicenje(int takmicenjeId)
        {
            var logged = await UserManager.GetUserAsync(User);
            var student = await Context.Students
            .Where(u => u.Id == logged.Id)
            .Include(u => u.PrijavaZaTakmicenje)
            .FirstOrDefaultAsync();

            var takmicenje = await Context.Takmicenjes
            .Include(i => i.PrijavaZaTakmicenje)
            .ThenInclude(a => a.Student)
            .Where(i => i.ID == takmicenjeId)
            .FirstOrDefaultAsync();

            if (student != null && takmicenje != null)
            {
                if (takmicenje.PrijavaZaTakmicenje.Where(a => a.Student.Id == student.Id).Count() != 0)
                {
                    return new JsonResult(new { succeeded = false, error = "Student je vec prijavljen na ovo takmicenje" });
                }
                var prijava = new PrijavaZaTakmicenje
                {
                    Student = student,
                    Takmicenje = takmicenje,
                    Status = "Applied",
                    Date = DateTime.Now
                };
                takmicenje.PrijavaZaTakmicenje.Add(prijava);
                student.PrijavaZaTakmicenje.Add(prijava);
                await Context.SaveChangesAsync();
                return new JsonResult(new { succeeded = true });
            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Student ili Takmicenje nije pronadjeno." });
            }
        }
//ova metoda RADI!
        [HttpGet]
        [Route("GetPrijava/{internshipId}")]//vraca prijavu za takmicenje
        [Authorize(Roles = "Student, Administrator")]
        public async Task<JsonResult> GetPrijava(int internshipId)
        {
            //var logged = await UserManager.GetUserAsync(User);
            var student = await Context.Students
            //.Where(u => u.Id == logged.Id)
            .Include(u => u.PrijavaZaTakmicenje)
            .FirstOrDefaultAsync();

            var takmicenje = await Context.Takmicenjes
            .Include(i => i.PrijavaZaTakmicenje)
            .ThenInclude(a => a.Student)
            .Where(i => i.ID == internshipId)
            .FirstOrDefaultAsync();

            if (student != null && takmicenje != null)
            {
                if (takmicenje.PrijavaZaTakmicenje.Where(a => a.Student.Id == student.Id).Count() != 0)
                {
                    return new JsonResult(new { succeeded = true, applied = true });
                }
                return new JsonResult(new { succeeded = true, applied = false });
            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Student or Takmicenje Not Found" });
            }
        }

        [HttpPost("PlatiClanarinu")]
        public async Task<ActionResult> PlatiClanarinu([FromBody]PlaceneClanarine prijava)
        {
            try
            {
                await Context.PlaceneClanarine.AddAsync(prijava);
                await Context.SaveChangesAsync();
                return Ok($"Clanarina je placena = {prijava.ID}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("ApplyToTrening/{treningId}")]//prijava za takmicenje, kasnije promeni, prvo fetchuj
        [Authorize(Roles = "Student, Administrator")]
        public async Task<JsonResult> ApplyToTrening(int treningId)
        {
            var logged = await UserManager.GetUserAsync(User);
            var student = await Context.Students
            .Where(u => u.Id == logged.Id)
            .Include(u => u.ZakazaniTrening)
            .FirstOrDefaultAsync();

            var trening = await Context.Trenings
            .Include(i => i.ZakazaniTrening)
            .ThenInclude(a => a.Student)
            .Where(i => i.ID == treningId)
            .FirstOrDefaultAsync();

            if (student != null && trening != null)
            {
                if (trening.ZakazaniTrening.Where(a => a.Student.Id == student.Id).Count() != 0)
                {
                   return new JsonResult(new { succeeded = false, error = "Student je vec zakazao ovaj trening" });
                }
                var prijava = new ZakazaniTrening
                {
                    Student = student,
                    Trening = trening
                };
                trening.ZakazaniTrening.Add(prijava);
                student.ZakazaniTrening.Add(prijava);
                await Context.SaveChangesAsync();
                return new JsonResult(new { succeeded = true });
            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Student ili Trening nije pronadjen." });
            }

        }
        [HttpDelete]
        [Route("DeleteTrening/{treningId}")]
        [Authorize(Roles = "Student, Administrator")]
        public async Task<JsonResult> DeleteTrening(int treningId)
        {
            var logged = await UserManager.GetUserAsync(User);
            var student = await Context.Students
                .Include(u => u.ZakazaniTrening)
                .FirstOrDefaultAsync(u => u.Id == logged.Id);

            if (student != null)
            {
                // var prijava = student.ZakazaniTrening.FirstOrDefault(z => z.Trening.ID == treningId);
                var prijava = Context.ZakazaniTrenings.Where(a=>a.Student.Id==student.Id && a.Trening.ID==treningId).FirstOrDefault();
                if (prijava != null)
                {
                    Context.ZakazaniTrenings.Remove(prijava);
                    await Context.SaveChangesAsync();
                    return new JsonResult(new { succeeded = true });
                }
                else
                {
                    return new JsonResult(new { succeeded = false, error = "Prijavu nije moguće pronaći." });
                }
            }
            else
            {
                return new JsonResult(new { succeeded = false, error = "Student nije pronađen." });
            }
        }
         [HttpPut]
        [Route("ApplyToTim/{timId}")]//prijava za takmicenje, kasnije promeni, prvo fetchuj
        [Authorize(Roles = "Student, Administrator")]
        public async Task<JsonResult> ApplyToTim(int timId)
        {
            var logged = await UserManager.GetUserAsync(User);
            var student = await Context.Students
            .Where(u => u.Id == logged.Id)
            .Include(u => u.UpisaniTim)
            .FirstOrDefaultAsync();

            var tim = await Context.Tims
            .Include(i => i.UpisaniTim)
            .ThenInclude(a => a.Student)
            .Where(i => i.ID == timId)
            .FirstOrDefaultAsync();

            if (student != null && tim != null)
            {
                if (tim.UpisaniTim.Where(a => a.Student.Id == student.Id).Count() != 0)
                {
                   return new JsonResult(new { succeeded = false, error = "Student je vec upisan u ovaj tim" });
                }
                var prijava = new UpisaniTim
                {
                    Student = student,
                    Tim = tim
                };
                tim.UpisaniTim.Add(prijava);
                student.UpisaniTim.Add(prijava);
                await Context.SaveChangesAsync();
                return new JsonResult(new { succeeded = true });
            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Student ili Tim nije pronadjen." });
            }

        }
        [HttpDelete]
        [Route("DeleteTim/{timId}")]
        [Authorize(Roles = "Student, Administrator")]
        public async Task<JsonResult> DeleteTim(int timId)
        {
            var logged = await UserManager.GetUserAsync(User);
            var student = await Context.Students
                .Include(u => u.UpisaniTim)
                .FirstOrDefaultAsync(u => u.Id == logged.Id);

            if (student != null)
            {
                // var prijava = student.ZakazaniTrening.FirstOrDefault(z => z.Trening.ID == treningId);
                var prijava = Context.UpisaniTims.Where(a=>a.Student.Id==student.Id && a.Tim.ID==timId).FirstOrDefault();
                if (prijava != null)
                {
                    Context.UpisaniTims.Remove(prijava);
                    await Context.SaveChangesAsync();
                    return new JsonResult(new { succeeded = true });
                }
                else
                {
                    return new JsonResult(new { succeeded = false, error = "Prijavu nije moguće pronaći." });
                }
            }
            else
            {
                return new JsonResult(new { succeeded = false, error = "Student nije pronađen." });
            }
        }
}