namespace Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;

public class Trener : ApplicationUser
{
    public required string ImeT { get; set; }
    public required string PrezimeT { get; set; }
    public required string Slika { get; set; }

    public PersonalInfoTrener PersonalInfoTrener { get; set; } = default!;
   // public Sport? Sport { get; set; }
    public List<Student>? Students { get; set; }
    public List<Trening>? Trenings { get; set; }
    public List<Tim>? Tims { get; set; }
}