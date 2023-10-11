namespace WebTemplate.Controllers;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

[ApiController]
[Route("[controller]")]
public class ZaposleniController : ControllerBase
{
    public Context Context { get; set; }
    public UserManager<ApplicationUser> UserManager { get; set; }
    public ZaposleniController(Context context, UserManager<ApplicationUser> userManager)
    {
        Context = context;
        UserManager = userManager;
    }
 
    [HttpPost("DodajZaposlenog")]
    public async Task<ActionResult> DodajZaposlenog([FromBody]Zaposleni zaposleni)
    {
        try
        {
            await Context.Zaposlenis.AddAsync(zaposleni);
            await Context.SaveChangesAsync();
            return Ok($"ID zaposlenog je = {zaposleni.Id}");
           // return new JsonResult(new { succeeded = true });//ukoliko je JsonResult 
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpDelete("ObrisiZaposlenog/{id}")]
    public async Task<ActionResult> ObrisiZaposlenog(int id)
    {
        var zaposleni = await Context.Zaposlenis.FindAsync(id);

        if (zaposleni != null)
        {
            Context.Zaposlenis.Remove(zaposleni);
            await Context.SaveChangesAsync();
            return Ok($"Izbrisan je zaposleni sa ID: {zaposleni.Id} ");
        }
        else
        {
            return BadRequest("Neuspelo!");
        }
    }
    /*
    [HttpPut("AzurirajZaposlenog/{id}")]
    public async Task<ActionResult> AzurirajZaposlenog(int id,[FromBody]Zaposleni zaposleni)
    {
        var stari=await Context.Zaposlenis.FindAsync(id);
        try
        {
            stari!.Ime=zaposleni.Ime;
            stari.Prezime=zaposleni.Prezime;
            
            Context.Zaposlenis.Update(stari);
            await Context.SaveChangesAsync();
            return Ok($"Azuriran je zaposleni = {stari}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }*/
    [HttpGet("PreuzmiZaposlene")]
    public async Task<ActionResult> PreuzmiZaposlene()
    {
        try
        {
            return Ok(await Context.Zaposlenis.ToListAsync());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
 
    [HttpPost("DodajClanarinu")]
    public async Task<ActionResult> DodajClanarinu([FromBody]Clanarina clanarina)
    {
        try
        {
            await Context.Clanarinas.AddAsync(clanarina);
            await Context.SaveChangesAsync();
            return Ok($"ID clanarine je = {clanarina.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpDelete("ObrisiCalanarinu/{id}")]
    public async Task<ActionResult> ObrisiClanarinu(int id)
    {
        var clanarina = await Context.Clanarinas.FindAsync(id);

        if (clanarina != null)
        {
            Context.Clanarinas.Remove(clanarina);
            await Context.SaveChangesAsync();
            return Ok($"Izbrisana je clanarina sa ID: {clanarina.ID} ");
        }
        else
        {
            return BadRequest("Neuspelo!");
        }
    }
    [HttpPut("AzurirajClanarinu/{id}/{cena}/{mesec}")]
    public async Task<ActionResult> AzurirajClanarinu(int id,int cena, string mesec)
    {
        var clanarina=await Context.Clanarinas.FindAsync(id);
        try
        {
            clanarina!.Cena=cena;
            clanarina.Mesec=mesec;
            Context.Clanarinas.Update(clanarina);
            await Context.SaveChangesAsync();
            return Ok($"Azurirana je clanarina = {clanarina}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpGet("PreuzmiClanarine")]
    public async Task<ActionResult> PreuzmiClanarine()
    {
        try
        {
            return Ok(await Context.Clanarinas.ToListAsync());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
        [HttpGet("GetPlaceneClanarine/{clanarinaId}")]
        public async Task<ActionResult> GetPlaceneClanarine(int clanarinaId)
        {
            var clanarine= await Context.PlaceneClanarine.Where(p=>p.ClanarinaId==clanarinaId).ToListAsync();
            try
            {
                return Ok(clanarine);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
         [HttpGet("ObrisiPlacenuClanarinu/{id}")]
        public async Task<ActionResult> ObrisiPlacenuClanarinu(int id)
        {
            var clanarina=await Context.PlaceneClanarine.FindAsync(id);
            try
            {
                Context.PlaceneClanarine.Remove(clanarina);
                Context.SaveChanges();
                return Ok("Uspesno brisanje");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet]
        [Route("GetZaposleniInfo")]
        //[Authorize(Roles = "Employer, Admin, Student")]
        public async Task<JsonResult> GetZaposleniInfo(string? employerId = "")
        {
            var logged = await UserManager.GetUserAsync(User);
            if (employerId != null && employerId != "")
                logged = null;
            var employer = await Context.Zaposlenis
                .Where(i => i.Id == (logged != null ? logged.Id : employerId))
                .Include(i => i.Takmicenjes)
                .ThenInclude(i => i.Sports)
                .FirstOrDefaultAsync();
            if (employer != null)
            {
                return new JsonResult(new
                {
                    succeeded = true,
                    employer = new
                    {
                        employer.Id,
                        employer.UserName,
                        employer.ImeZ,
                        employer.PrezimeZ,
                        employer.Slika,
                        employer.Email,
                        Takmicenjes = employer?.Takmicenjes?
                              .Select(c => new
                              {
                                  c.ID,
                                  c.NazivTakmicenja,
                                  c.MestoOdrzavanja,
                                  c.DatumOdrzavanja,
                                  Sport = c.Sports?.Select(s => new { s.ID, s.Naziv })
                              })
                    }
                });
            }
            else
            {
                return new JsonResult(new
                {
                    succeeded = false,
                    error = "Zaposleni nije pronadjen"
                });
            }
        }
    private class AspNetUserManager
    {
        internal static Task GetUserAsync(ClaimsPrincipal user)
        {
            throw new NotImplementedException();
        }
    }

}