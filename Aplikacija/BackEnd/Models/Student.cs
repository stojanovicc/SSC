namespace Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

public class Student : ApplicationUser
{
    public required string Ime { get; set; }
    public required string Prezime { get; set; }
    public required string Slika { get; set; }

    
    public PersonalInfoStudent PersonalInfoStudent { get; set; } = default!;
    public List<Trening>? Trenings { get; set; }
    public List<Takmicenje>? Takmicenjes { get; set; }
    public List<Clanarina>? Clanarinas { get; set; }
    public List<PrijavaZaTakmicenje>? PrijavaZaTakmicenje { get; set; }
    public List<PrijavaZaTrening>? PrijavaZaTrening { get; set; }
    public List<ZakazaniTrening>? ZakazaniTrening { get; set; }
    public List<PlaceneClanarine>? PlaceneClanarine { get; set; }
    public List<UpisaniTim>? UpisaniTim { get; set; }
    public List<Tim>? Tims { get; set; }
  
}