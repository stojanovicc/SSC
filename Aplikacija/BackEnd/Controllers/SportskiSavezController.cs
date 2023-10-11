using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
namespace WebTemplate.Controllers;
using Models;

[ApiController]
[Route("[controller]")]
public class SportskiSavezController : ControllerBase
{
    public Context Context { get; set; }

    public SportskiSavezController(Context context)
    {
        Context = context;
    }
    public UserManager<ApplicationUser> UserManager { get; set; }
//SPORT
    [HttpDelete("ObrisiSport/{id}")]
    public async Task<ActionResult> ObrisiSport(int id)
    {
        var stari = await Context.Sports.FindAsync(id);

        if (stari != null)
        {
            string naziv = stari.Naziv;

            Context.Sports.Remove(stari);
            await Context.SaveChangesAsync();
            return Ok($"Izbrisan je sport sa nazivom = {naziv}");
        }
        else
        {
            return BadRequest("Neuspelo!");
        }
    }

    [HttpPut("AzurirajSport/{id}")]
    public async Task<ActionResult> AzurirajSport(int id, [FromBody]Sport sport)
    {
        var stari = await Context.Sports.FindAsync(id);

        if (stari != null)
        {
            stari.Naziv = sport.Naziv;

            Context.Sports.Update(stari);
            await Context.SaveChangesAsync();
            return Ok($"Azuriran je sport sa ID = {stari.ID}");
        }
        else
        {
            return BadRequest("Neuspelo!");
        }
    }

    [HttpGet("PreuzmiSportove")]
    public async Task<ActionResult> PreuzmiSportove()
    {
        try
        {
            return Ok(await Context.Sports.ToListAsync());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

//KATEGORIJE sportova
[HttpPost("DodajKategoriju")]
    public async Task<ActionResult> DodajKategoriju([FromBody]Kategorija kategorija)
    {
        try
        {
            await Context.Kategorijas.AddAsync(kategorija);
            await Context.SaveChangesAsync();
            return Ok($"ID nove kategorije je = {kategorija.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("ObrisiKategoriju/{id}")]
    public async Task<ActionResult> ObrisiKategoriju(int id)
    {
        var stara = await Context.Kategorijas.FindAsync(id);

        if (stara != null)
        {
            string naziv = stara.NazivKategorije;

            Context.Kategorijas.Remove(stara);
            await Context.SaveChangesAsync();
            return Ok($"Izbrisana je kategorija sa nazivom = {naziv}");
        }
        else
        {
            return BadRequest("Neuspelo!");
        }
    }

    [HttpPut("AzurirajKategoriju/{id}")]
    public async Task<ActionResult> AzurirajKategoriju(int id, [FromBody]Kategorija kategorija)
    {
        var stara = await Context.Kategorijas.FindAsync(id);

        if (stara != null)
        {
            stara.NazivKategorije = kategorija.NazivKategorije;

            Context.Kategorijas.Update(stara);
            await Context.SaveChangesAsync();
            return Ok($"Azurirana je kategorija sa ID = {stara.ID}");
        }
        else
        {
            return BadRequest("Neuspelo!");
        }
    }

    [HttpGet("PreuzmiKategorije")]
    public async Task<ActionResult> PreuzmiKategorije()
    {
        try
        {
            return Ok(await Context.Kategorijas.Include(p=>p.Sports).ToListAsync());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpGet("PreuzmiSportoveIzKategorije/{nazivKategorije}")]//vraca listu sportova za datu kategoriju
    public async Task<ActionResult> PreuzmiSportoveIzKategorije(string nazivKategorije)
    {
        var sportovi=await Context.Kategorijas.Where(p=>p.NazivKategorije==nazivKategorije).Include(f=>f.Sports).ToListAsync();
        try
        {
            return Ok(sportovi);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpGet("PreuzmiNaziveKategorija")]
    public async Task<ActionResult> PreuzmiNaziveKategorija()
    {
        var naziviKategorija=await Context.Kategorijas.Select(p=>p.NazivKategorije).ToListAsync();
        try
        {
            return Ok(naziviKategorija);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpGet("PreuzmiNaziveSportova")]
    public async Task<ActionResult> PreuzmiNaziveSportova()
    {
        var naziviSportova=await Context.Sports.Select(p=>p.Naziv).ToListAsync();
        try
        {
            return Ok(naziviSportova);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

        [HttpPost]
        [Route("DodajTakmicenje")]
        [Authorize(Roles = "Zaposleni, Administrator")]
        public async Task<ActionResult> DodajTakmicenje([FromBody]Takmicenje takmicenje)
        {
            try
            {
                await Context.Takmicenjes.AddAsync(takmicenje);
                await Context.SaveChangesAsync();
                return Ok($"ID novog takmicenja je = {takmicenje.ID}");
            }
            catch
            {
                return BadRequest("Nije uspelo dodavanje takmicenja");
            }
        }
        [HttpDelete]
        [Route("BrisanjeTakmicenja/{id}")]
        [Authorize(Roles = "Zaposleni, Administrator")]
        public async Task<ActionResult> BrisanjeTakmicenja(int id)
        {
            try
            {
                var takmicenje=await Context.Takmicenjes.FirstOrDefaultAsync(p=>p.ID==id);
                if (takmicenje==null)
                {
                    return BadRequest("Takmicenje nije postoji");
                }
                    Context.Takmicenjes.Remove(takmicenje);
                    await Context.SaveChangesAsync();
                    return Ok($"Takmicenje s ID-jem {id} je uspesno izbrisano");
                    }
                    catch
                    {
                        return BadRequest("Ne mogu izbrisati takmicenje");
                    }
        }
        [HttpGet]
        [Route("PreuzmiTakmicenja")]
        public async Task<ActionResult> PreuzmiTakmicenja()
        {
        try
            {
            return Ok(await Context.Takmicenjes.ToListAsync());
            }
        catch (Exception e)
            {
            return BadRequest(e.Message);
            }
        }
        [HttpGet("PreuzmiNaziveTakmicenja")]
        public async Task<ActionResult> PreuzmiNaziveTakmicenja()
        {
            var naziviTakmicenja=await Context.Takmicenjes.Select(p=>p.NazivTakmicenja).ToListAsync();
            try
            {
                return Ok(naziviTakmicenja);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost]
        [Route("DodajFakultet")]
        public async Task<ActionResult> DodajFakultet([FromBody]Fakultet fakultet)
        {
            try
            {
                await Context.Fakultets.AddAsync(fakultet);
                await Context.SaveChangesAsync();
                return Ok($"ID novog fakulteta je = {fakultet.ID}");
            }
            catch
            {
                return BadRequest("Ne mogu dodati fakultet");
            }
        }
         [HttpDelete]
        [Route("BrisanjeFakulteta/{id}")]
        public async Task<ActionResult> BrisanjeFakulteta(int id)
        {
            try
            {
                var fakultet=await Context.Fakultets.FirstOrDefaultAsync(p=>p.ID==id);
                if (fakultet==null)
                {
                    return BadRequest("Fakultet nije postoji");
                }
                    Context.Fakultets.Remove(fakultet);
                    await Context.SaveChangesAsync();
                    return Ok($"Fakultet s ID-jem {id} je uspesno izbrisan");
                    }
                    catch
                    {
                        return BadRequest("Ne mogu izbrisati fakultet");
                    }
        } 
        [HttpGet]
        [Route("PreuzmiFakultete")]
        public async Task<ActionResult> PreuzmiFakultete()
        {
        try
            {
            return Ok(await Context.Fakultets.ToListAsync());
            }
        catch (Exception e)
            {
            return BadRequest(e.Message);
            }
        }
        [HttpGet("PreuzmiNaziveFakulteta")]
        public async Task<ActionResult> PreuzmiNaziveFakulteta()
        {
            var naziviFakulteta=await Context.Fakultets.Select(p=>p.NazivFakulteta).ToListAsync();
            try
            {
                return Ok(naziviFakulteta);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        //ova metoda RADI!
        [HttpPost]
        [Route("PostTakmicenje")]//dodavanje takmicenja
        //[Authorize(Roles = "Zaposleni, Administrator")]
        public async Task<JsonResult> PostTakmicenje([FromBody] TakmicenjeModel info)
        {
            //var logged = await UserManager.GetUserAsync(User);
            var zaposleni = await Context.Zaposlenis
            //.Where(u => u.Id == logged.Id)
            .Include(u => u.Takmicenjes)
            .FirstOrDefaultAsync();

            if (zaposleni != null)
            {
                var takmicenje = new Takmicenje
                {
                    NazivTakmicenja = info.NazivTakmicenja,
                    MestoOdrzavanja = info.MestoOdrzavanja,
                    DatumOdrzavanja = info.DatumOdrzavanja,
                    Zaposleni = zaposleni,
                    Sports = new List<Sport>()
                };

                foreach (var sk in info.Sports)
                {
                    var sport = await Context.Sports
                        .Where(s => s.Naziv == sk)
                        .Include(s => s.Takmicenjes)
                        .FirstOrDefaultAsync();
                    if (sport != null)
                    {
                        takmicenje.Sports.Add(sport);
                        sport.Takmicenjes?.Add(takmicenje);
                    }
                }
                await Context.SaveChangesAsync();

                return new JsonResult(new { succeeded = true });
            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Zaposleni nije pronadjen" });
            }
        }

        [HttpPut]
        [Route("EditTakmicenje/{takmicenjeId}/{naziv}/{mesto}/{datum}")]
        [Authorize(Roles = "Zaposleni, Administrator")]
        public async Task<JsonResult> EditTakmicenje(int takmicenjeId, string naziv, string mesto, string datum)
        {
            //var logged = await UserManager.GetUserAsync(User);
            var zaposleni = await Context.Zaposlenis
            //.Where(u => u.Id == logged.Id)
            .Include(u => u.Takmicenjes)
            .FirstOrDefaultAsync();

            var takmicenje = await Context.Takmicenjes
                .Where(i => i.ID == takmicenjeId)
                .Include(i => i.Zaposleni)
                .FirstOrDefaultAsync();
            // if (!( (takmicenje != null ? takmicenje.Zaposleni.Id : "a") == (zaposleni != null ? zaposleni.Id : "b")))
            // {
            //     return new JsonResult(new
            //     {
            //         succeeded = false,
            //         error = "Incorrect authorization"
            //     });
            // }

            if (takmicenje != null)
            {
                takmicenje.NazivTakmicenja = naziv;
                takmicenje.MestoOdrzavanja = mesto;
                takmicenje.DatumOdrzavanja = datum;

                Context.Takmicenjes.Update(takmicenje);
                await Context.SaveChangesAsync();
                return new JsonResult(new
                {
                    succeeded = true
                });
            }
            else
            {
                return new JsonResult(new
                {
                    succeeded = false,
                    error = "Takmicenje Not Found"
                });
            }
        }
        //ova metoda RADI!
        [HttpGet]
        [Route("GetTakmicenje/{takmicenjeId}")]
        public async Task<JsonResult> GetTakmicenje(int takmicenjeId)
        {
            //var logged = await UserManager.GetUserAsync(User);
            var zaposleni = await Context.Zaposlenis
            //.Where(u => u.Id == logged.Id)
            .Include(u => u.Takmicenjes)
            .FirstOrDefaultAsync();

            var takmicenje = await Context.Takmicenjes
                .Where(i => i.ID == takmicenjeId)
                .Include(i => i.Zaposleni)
                .Include(i => i.Sports)
                .FirstOrDefaultAsync();

            if (takmicenje != null)
            {
                bool takmicenjeOwner = false;
                if (zaposleni != null)
                {
                    takmicenjeOwner = zaposleni.Takmicenjes.Contains(takmicenje);
                }
                
                return new JsonResult(new
                {
                    succeeded = true,
                    takmicenje = new
                    {
                        takmicenjeOwner,
                        takmicenje.ID,
                        takmicenje.NazivTakmicenja,
                        takmicenje.MestoOdrzavanja,
                        takmicenje.DatumOdrzavanja,
                        takmicenje.Sports,
                    }
                });
            }
            else
            {
                return new JsonResult(new
                {
                    succeeded = false,
                    error = "Takmicenje nije pronadjeno"
                });
            }
        }
        
        [HttpGet]
        [Route("GetAppliedStudents/{takmicenjeId}")]//oni koji su prijavljeni na takmicenje
        [Authorize(Roles = "Zaposleni, Administrator")]
        public async Task<JsonResult> GetAppliedStudents(int takmicenjeId)
        {
            var takmicenje = await Context.Takmicenjes
                .Where(i => i.ID == takmicenjeId)
                .Include(i => i.PrijavaZaTakmicenje)
                .ThenInclude(a => a.Student.PersonalInfoStudent.Sports)
                .FirstOrDefaultAsync();

            if (takmicenje != null)
            {
                return new JsonResult(new
                {
                    succeeded = true,
                    takmicenje = new
                    {
                        takmicenje.ID,
                        Applicants = takmicenje.PrijavaZaTakmicenje
                        .OrderBy(s => s.Date)
                        .Select(s =>
                        new
                        {
                            s.Student.Id,
                            ApplicationID = s.ID,
                            Name = s.Student.Ime,
                            LastName = s.Student.Prezime,
                            Sports = s.Student.PersonalInfoStudent.Sports.Select(k => new { k.ID, Label = k.Naziv }),
                            s.Status
                        })
                    }
                });
            }
            else
            {
                return new JsonResult(new
                {
                    succeeded = false,
                    error = "Takmicenje nije pronadjeno"
                });
            }
        }

        //ova metoda RADI!
        [HttpGet]
        [Route("GetTakmicenja")]//vraca sva takmicenja
        public async Task<JsonResult> GetTakmicenja()
        {
            var takmicenje = await Context.Takmicenjes
            .Include(i => i.Sports)
            .ToListAsync();
            //var logged = await UserManager.GetUserAsync(User);
            if (takmicenje != null)
            {
                return new JsonResult(new
                {
                    succeeded = true,
                    takmicenje = new
                    {
                        Takmicenje = takmicenje.Select(takmicenje => new
                        {
                            id = takmicenje.ID,
                            takmicenje.NazivTakmicenja,
                            takmicenje.MestoOdrzavanja,
                            takmicenje.DatumOdrzavanja,
                            takmicenje.Sports
                        })

                    }
                });
            }
            else
            {
                return new JsonResult(new
                {
                    succeeded = false,
                    error = "Takmicenje nije pronadjeno"
                });
            }
        }


        [HttpPost]
        [Route("TakmicenjeAction")]
        [Authorize(Roles = "Zaposleni, Administrator")]
        public async Task<JsonResult> TakmicenjeAction([FromQuery] int takmicenjeId, string studentId, int applicationId, string action, bool? denyOthers)
        {
            if (denyOthers == null) denyOthers = false;
            var takmicenje = await Context.Takmicenjes
                .Where(i => i.ID == takmicenjeId)
                .Include(i => i.PrijavaZaTakmicenje)
                .ThenInclude(a => a.Student)
                .Include(i => i.Sports)
                .Include(i => i.Zaposleni)
                .FirstOrDefaultAsync();
            var student = await Context.Students
                .Where(s => s.Id == studentId)
                .Include(s => s.PrijavaZaTakmicenje)
                .ThenInclude(a => a.Takmicenje)
                .FirstOrDefaultAsync();
            if (student == null || takmicenje == null)
                return new JsonResult(new
                {
                    succeeded = false,
                    error = "Takmicenje or Student Not Found"
                });
            var application = takmicenje.PrijavaZaTakmicenje
                .Where(a => a.ID == applicationId)
                .FirstOrDefault();
            if (application == null)
                return new JsonResult(new
                {
                    succeeded = false,
                    error = "Application Not Found"
                });

            //[title, companyName, location, compensation, duration, description, link, messageContent, ...skills] = content.split("^");
            string specialContent = $"{takmicenje.NazivTakmicenja}^{takmicenje.Zaposleni.ImeZ}^{takmicenje.Zaposleni.PrezimeZ}^{takmicenje.MestoOdrzavanja}^"
                + $"{takmicenje.DatumOdrzavanja}^{"/Takmicenje/" + takmicenje.ID}";
            string specialType = "INTERNSHIP_";
            foreach (var sport in takmicenje.Sports)
            {
                specialContent += "^" + sport.Naziv;
            }
            if (action == "Accept")
            {
                application.Status = "Accepted";
                application.Date = DateTime.Now;
                if ((bool)denyOthers)
                {
                    string denyContent = $"{takmicenje.NazivTakmicenja}^{takmicenje.Zaposleni.ImeZ}^{takmicenje.Zaposleni.PrezimeZ}^{takmicenje.MestoOdrzavanja}^"
                + $"{takmicenje.DatumOdrzavanja}^{"/Takmicenje/" + takmicenje.ID}^Your application has been denied";
                    foreach (var sport in takmicenje.Sports)
                    {
                        denyContent += "^" + sport.Naziv;
                    }
                    foreach (var appl in takmicenje.PrijavaZaTakmicenje)
                    {
                        if (appl.ID != applicationId && appl.Status == "Applied") //dodati eentualno slanje poruke
                        {
                            appl.Status = "Denied";
                            appl.Date = DateTime.Now;
                        }
                    }
                }
                specialType += "ACCEPT";
            }
            else if (action == "Deny")
            {
                application.Status = "Denied";
                application.Date = DateTime.Now;
                specialType += "DENY";
            }
            else if (action == "Finish")
            {
                application.Status = "Finished";
                application.Date = DateTime.Now;
            }
            await Context.SaveChangesAsync();
            return new JsonResult(new { succeeded = true });
        }


        [HttpGet]
        [Route("GetStudentTakmicenja")]//vraca studentska takmicenja
        [Authorize(Roles = "Student, Administrator")]
        public async Task<JsonResult> GetStudentTakmicenja()
        {
            var logged = await UserManager.GetUserAsync(User);
            var student = await Context.Students
            .Where(u => u.Id == logged.Id)
            .Include(u => u.PrijavaZaTakmicenje)
            .ThenInclude(a => a.Takmicenje)
            .ThenInclude(i => i.Zaposleni)
            .Include(u => u.PrijavaZaTakmicenje)
            .ThenInclude(a => a.Takmicenje.Sports)
            .FirstOrDefaultAsync();

            if (student != null)
            {
                return new JsonResult(new
                {
                    succeeded = true,
                    prijave = student.PrijavaZaTakmicenje
                    .Select(a => new
                    {
                        ApplicationID = a.ID,
                        TakmicenjeID = a.Takmicenje.ID,
                        a.Status,
                        a.Takmicenje.NazivTakmicenja,
                        a.Takmicenje.MestoOdrzavanja,
                        a.Takmicenje.DatumOdrzavanja,
                        a.Takmicenje.Sports,
                        a.Takmicenje.Zaposleni.ImeZ,
                        a.Takmicenje.Zaposleni.PrezimeZ
                    })
                }
                );
            }
            else
            {
                return new JsonResult(new
                {
                    succeeded = false,
                    error = "Student nije pronadjen"
                });
            }
        }
    }