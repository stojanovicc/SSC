namespace WebTemplate.Controllers;
using System.Runtime.CompilerServices;
using System.Runtime.Intrinsics.X86;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

[ApiController]
[Route("[controller]")]

public class TrenerController : ControllerBase
{
    public Context Context { get; set; }
    public UserManager<ApplicationUser> UserManager { get; set; }
    public TrenerController(Context context, UserManager<ApplicationUser> userManager)
        {
            Context = context;
            UserManager = userManager;
        }
     [HttpGet]
    [Route("GetTreners")]
    public async Task<JsonResult> GetTreners()
    {
        var treners = await Context.Treners
        //.Include(i => i.Sports)
        .ToListAsync();
        if (treners != null)
        {
            return new JsonResult(new
            {
                succeeded = true,
                treners = new
                {
                    Treners = treners.Select(emp => new
                    {
                        id = emp.Id,
                        emp.ImeT,
                        emp.PrezimeT,
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
                error = "Trener Not Found"
            });
        }
    }


//TRENER
    [HttpPost("DodajTrenera")]
    public async Task<ActionResult> DodajTrenera([FromBody]Trener trener)
    {
        try
        {
            await Context.Treners.AddAsync(trener);
            await Context.SaveChangesAsync();
            return Ok($"ID novog trenera je = {trener.Id}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("ObrisiTrenera/{id}")]
    public async Task<ActionResult> ObrisiTrenera(int id)
    {
        var star = await Context.Treners.FindAsync(id);

        if (star != null)
        {
            string ime = star.ImeT;
            string prezime = star.PrezimeT;
            
            Context.Treners.Remove(star);
            await Context.SaveChangesAsync();
            return Ok($"Izbrisan je trener sa imenom i prezimenom = {ime} {prezime} ");
        }
        else
        {
            return BadRequest("Neuspelo!");
        }
    }

    [HttpPut("AzurirajTrenera/{id}")]
    public async Task<ActionResult> AzurirajTrenera(int id, [FromBody]Trener trener)
    {
        var stari = await Context.Treners.FindAsync(id);

        if (stari != null)
        {
            //stari.Username = trener.Username;
           // stari.Password = trener.Password;
          //  stari.RadniStaz = trener.RadniStaz;
           // stari.brojTelefona = trener.brojTelefona;
           // stari.Email = trener.Email;

            Context.Treners.Update(stari);
            await Context.SaveChangesAsync();
            return Ok($"Azuriran je trener sa ID = {stari.Id}");
        }
        else
        {
            return BadRequest("Neuspelo!");
        }
    }

    [HttpGet("PreuzmiTrenere")]
    public async Task<ActionResult> PreuzmiTrenere()
    {
        try
        {
            return Ok(await Context.Treners.ToListAsync());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

//TRENING
    [HttpPost("DodajTrening")]
    public async Task<ActionResult> DodajTrening([FromBody]Trening trening)
    {
        try
        {
            await Context.Trenings.AddAsync(trening);
            await Context.SaveChangesAsync();
            return Ok($"ID novog treninga je = {trening.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    // [HttpPost("DodajTrening/{trenerID}/{vreme}/{mesto}")]
    // public async Task<ActionResult> DodajTrening(int trenerID, DateTime vreme, string mesto)
    // {
    //     var trener= await Context.Treners.FindAsync(trenerID);
    //     var trening= new Trening
    //     {
    //         Vreme=DateTime.Now,
    //         Mesto=mesto,
    //         Treners=trener
    //     };
    //     try
    //     {
    //         await Context.Trenings.AddAsync(trening);
    //         await Context.SaveChangesAsync();
    //         return Ok($"ID novog treninga je = {trening.ID}");
    //     }
    //     catch (Exception e)
    //     {
    //         return BadRequest(e.Message);
    //     }
    // }

    [HttpDelete("ObrisiTrening/{id}")]
    public async Task<ActionResult> ObrisiTrening(int id)
    {
        var star = await Context.Trenings.FindAsync(id);

        if (star != null)
        {
            DateTime vreme = star.Datum;

            Context.Trenings.Remove(star);
            await Context.SaveChangesAsync();
            return Ok($"Izbrisan je trening koji je trebao da se odrzi = {vreme}");
        }
        else
        {
            return BadRequest("Neuspelo!");
        }
    }

    [HttpPut("AzurirajTrening/{id}")]
    public async Task<ActionResult> AzurirajTrening(int id, [FromBody]Trening trening)
    {
        var star = await Context.Trenings.FindAsync(id);

        if (star != null)
        {
            star.Datum= trening.Datum;
            star.Vreme= trening.Vreme;
            star.Mesto = trening.Mesto;

            Context.Trenings.Update(star);
            await Context.SaveChangesAsync();
            return Ok($"Azuriran je trening sa ID = {star.ID}");
        }
        else
        {
            return BadRequest("Neuspelo!");
        }
    }

    [HttpGet("PreuzmiTreninge")]
    public async Task<ActionResult> PreuzmiTreninge()
    {
        try
        {
            return Ok(await Context.Trenings.ToListAsync());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpGet("PreuzmiMesta")]//mesta odrzavanja treninga
    public async Task<ActionResult> PreuzmiMesta()
    {
        var mesta=await Context.Trenings.Select(p=>p.Mesto).ToListAsync();
        try
        {
            return Ok(mesta);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpGet("PreuzmiVremena")]//mesta odrzavanja treninga
    public async Task<ActionResult> PreuzmiVremena()
    {
        var vremena=await Context.Trenings.Select(p=>p.Vreme).ToListAsync();
        try
        {
            return Ok(vremena);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    ///dodata za TRENING
    [HttpPost]
        [Route("PostTrening")]//dodavanje takmicenja
        [Authorize(Roles = "Trener, Administrator")]
        public async Task<JsonResult> PostTrening([FromBody] TreningModel info)
        {
            var logged = await UserManager.GetUserAsync(User);
            var trener = await Context.Treners
            .Where(u => u.Id== logged.Id)//treba da se doda Zaposleni
            .Include(u => u.Trenings)
            .FirstOrDefaultAsync();

            if (trener != null)
            {
                var trening = new Trening
                {
                    Datum=info.Datum,
                    Vreme=info.Vreme,
                    Mesto=info.Mesto,
                    //Sports=new List<Sport>(),
                };
                // foreach (var sk in info.Sports)
                // {
                //     var sport = await Context.Sports
                //         .Where(s => s.Naziv == sk)
                //         .Include(s => s.Trenings)
                //         .FirstOrDefaultAsync();
                //     if (sport != null)
                //     {
                //         trening.Sports.Add(sport);
                //         sport.Trenings?.Add(trening);
                //     }
                // }
                await Context.Trenings.AddAsync(trening);
                await Context.SaveChangesAsync();

                return new JsonResult(new { succeeded = true });

            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Trener nije pronadjen" });
            }
        }
        // [HttpGet("GetTreninzi")]
        // public async Task<ActionResult<List<Trening>>> GetTreninzi()
        // {
        //     var treningList = await Context.Trenings.ToListAsync();
        //     await Context.SaveChangesAsync();
        //     return Ok(treningList);
        // }
        [HttpGet]
        [Route("GetTreninzi")]//vraca sva takmicenja
        public async Task<JsonResult> GetTreninzi()
        {
            var trening = await Context.Trenings
            .Include(i => i.Treners)
            .ToListAsync();
            var logged = await UserManager.GetUserAsync(User);
            if (trening != null)
            {
                return new JsonResult(new
                {
                    succeeded = true,
                    trening = new
                    {
                        Trening = trening.Select(trening => new
                        {
                            id = trening.ID,
                            trening.Mesto,
                            trening.Datum,
                            trening.Vreme
                        })

                    }
                });
            }
            else
            {
                return new JsonResult(new
                {
                    succeeded = false,
                    error = "Trening nije pronadjen"
                });
            }
        }
        // [HttpGet("GetPrijave")]
        // public async Task<ActionResult<List<Trening>>> GetPrijave()
        // {
        //     var treningList = await Context.PrijavaZaTrening.ToListAsync();
        //     await Context.SaveChangesAsync();
        //     return Ok(treningList);
        // }
        // [HttpGet("GetPrijavljeniKorisnici/{treningId}")]
        // public async Task<ActionResult<List<PrijavaZaTrening>>> GetPrijavljeniKorisnici(int treningId)
        // {
        //     var prijave = await Context.PrijavaZaTrening
        //                                 .Where(p => p.TreningID == treningId)
        //                                 .Include(p => p.Student)
        //                                 .ToListAsync();
            
        //     return prijave;
        // }
        [HttpPost("DodajTim")]
        public async Task<ActionResult> DodajTim([FromBody]Tim tim)
        {
            try
            {
                await Context.Tims.AddAsync(tim);
                await Context.SaveChangesAsync();
                return Ok($"ID novog tima je = {tim.ID}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet("GetTimovi")]
        public async Task<ActionResult<List<Trening>>> GetTimovi()
        {
            var treningList = await Context.Tims.ToListAsync();
            await Context.SaveChangesAsync();
            return Ok(treningList);
        }
        [HttpGet]       
        [Route("GetPrijavaTrening/{treningId}")]//vraca prijavu za takmicenje
        [Authorize(Roles = "Student, Administrator")]
        public async Task<JsonResult> GetPrijavaTrening(int treningId)
        {
            //var logged = await UserManager.GetUserAsync(User);
            var student = await Context.Students
            //.Where(u => u.Id == logged.Id)
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
                    return new JsonResult(new { succeeded = true, applied = true });
                }
                return new JsonResult(new { succeeded = true, applied = false });
            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Student or Trening Not Found" });
            }

        }
        [HttpGet]
        [Route("GetTrening/{treningId}")]//vracanje takmicenja sa zadatim id-ijem

        public async Task<JsonResult> GetTrening(int treningId)
        {
            var logged = await UserManager.GetUserAsync(User);
            var trener = logged != null ? await Context.Treners
            .Where(u => u.Id == logged.Id)
            .Include(u => u.Trenings)
           // .ThenInclude(i => i.InterviewQuestions)
            .FirstOrDefaultAsync() : null;

            var trening = await Context.Trenings
                .Where(i => i.ID == treningId)
                .Include(i => i.Treners)
                //.Include(i => i.Sports)
                .FirstOrDefaultAsync();

            if (trening != null)
            {
                bool internshipOwner = false;
                if (trener != null)
                {
                    internshipOwner = trener.Trenings.Contains(trening);
                }
                if (logged is Administrator)
                {
                    internshipOwner = true;
                }
                return new JsonResult(new
                {
                    succeeded = true,
                    trening = new
                    {
                        internshipOwner,
                        trening.ID,
                        trening.Datum,
                        trening.Mesto,
                        trening.Vreme
                        //trening.Sports,
                    }
                });
            }
            else
            {
                return new JsonResult(new
                {
                    succeeded = false,
                    error = "Trening nije pronadjen"
                });
            }
        }
        [HttpGet]
        [Route("GetAppliedStudentsTrening/{treningId}")]//oni koji su prijavljeni na takmicenje
        [Authorize(Roles = "Trener, Administrator")]
        public async Task<JsonResult> GetAppliedStudentsTrening(int treningId)
        {
            var trening = await Context.Trenings
                .Where(i => i.ID == treningId)
                .Include(i => i.ZakazaniTrening)
                .ThenInclude(a => a.Student.PersonalInfoStudent.Sports)
                .FirstOrDefaultAsync();

            if (trening != null)
            {
                return new JsonResult(new
                {
                    succeeded = true,
                    trening = new
                    {
                        trening.ID,
                        Applicants = trening.ZakazaniTrening
                        //.OrderBy(s => s.Date)
                        .Select(s =>
                        new
                        {
                            s.Student.Id,
                            ApplicationID = s.ID,
                            Name = s.Student.Ime,
                            LastName = s.Student.Prezime,
                           // Sports = s.Student.PersonalInfoStudent.Sports.Select(k => new { k.ID, Label = k.Naziv }),
                           // s.Status
                        })
                    }
                });
            }
            else
            {
                return new JsonResult(new
                {
                    succeeded = false,
                    error = "Trening nije pronadjen"
                });
            }
        }
        
        [HttpGet]
        [Route("VratiTimove")]//vraca sva takmicenja
        public async Task<JsonResult> VratiTimove()
        {
            var tim = await Context.Tims
            .Include(i => i.Treners)
            .ToListAsync();
            var logged = await UserManager.GetUserAsync(User);
            if (tim != null)
            {
                return new JsonResult(new
                {
                    succeeded = true,
                    tim = new
                    {
                        Tim = tim.Select(tim => new
                        {
                            id = tim.ID,
                            tim.NazivTima,
                            tim.Fakultet,
                            tim.Sport
                        })

                    }
                });
            }
            else
            {
                return new JsonResult(new
                {
                    succeeded = false,
                    error = "Tim nije pronadjen"
                });
            }
        }
         [HttpGet]
        [Route("GetAppliedStudentsTim/{timId}")]//oni koji su prijavljeni na takmicenje
        [Authorize(Roles = "Trener, Administrator")]
        public async Task<JsonResult> GetAppliedStudentsTim(int timId)
        {
            var tim = await Context.Tims
                .Where(i => i.ID == timId)
                .Include(i => i.UpisaniTim)
                .ThenInclude(a => a.Student.PersonalInfoStudent.Sports)
                .FirstOrDefaultAsync();

            if (tim != null)
            {
                return new JsonResult(new
                {
                    succeeded = true,
                    tim = new
                    {
                        tim.ID,
                        Applicants = tim.UpisaniTim
                        //.OrderBy(s => s.Date)
                        .Select(s =>
                        new
                        {
                            s.Student.Id,
                            ApplicationID = s.ID,
                            Name = s.Student.Ime,
                            LastName = s.Student.Prezime,
                           // Sports = s.Student.PersonalInfoStudent.Sports.Select(k => new { k.ID, Label = k.Naziv }),
                           // s.Status

                        })
                    }
                });
            }
            else
            {
                return new JsonResult(new
                {
                    succeeded = false,
                    error = "Tim nije pronadjen"

                });
            }
        }

        [HttpGet]       
        [Route("GetPrijavaTim/{timId}")]//vraca prijavu za takmicenje
        [Authorize(Roles = "Student, Administrator")]
        public async Task<JsonResult> GetPrijavaTim(int timId)
        {
            //var logged = await UserManager.GetUserAsync(User);
            var student = await Context.Students
            //.Where(u => u.Id == logged.Id)
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
                    return new JsonResult(new { succeeded = true, applied = true });
                }
                return new JsonResult(new { succeeded = true, applied = false });
            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Student or Tim Not Found" });
            }

        }
        [HttpGet]
        [Route("GetTim/{timId}")]//vracanje takmicenja sa zadatim id-ijem

        public async Task<JsonResult> GetTim(int timId)
        {
            var logged = await UserManager.GetUserAsync(User);
            var trener = logged != null ? await Context.Treners
            .Where(u => u.Id == logged.Id)
            .Include(u => u.Tims)
           // .ThenInclude(i => i.InterviewQuestions)
            .FirstOrDefaultAsync() : null;

            var tim = await Context.Tims
                .Where(i => i.ID == timId)
                .Include(i => i.Treners)
                //.Include(i => i.Sports)
                .FirstOrDefaultAsync();

            if (tim != null)
            {
                bool internshipOwner = false;
                if (trener != null)
                {
                    internshipOwner = trener.Tims.Contains(tim);
                }
                if (logged is Administrator)
                {
                    internshipOwner = true;
                }
                return new JsonResult(new
                {
                    succeeded = true,
                    tim = new
                    {
                        internshipOwner,
                        tim.ID,
                        tim.NazivTima,
                        tim.Fakultet,
                        tim.Sport
                    }
                });
            }
            else
            {
                return new JsonResult(new
                {
                    succeeded = false,
                    error = "Tim nije pronadjen"
                });
            }
        }

       
}