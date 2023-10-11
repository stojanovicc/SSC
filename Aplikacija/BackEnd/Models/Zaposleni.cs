namespace Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;

public class Zaposleni : ApplicationUser
{
    public required string ImeZ { get; set; }
    public required string PrezimeZ { get; set; }
    public required string Slika { get; set; }
    
    public List<Takmicenje>? Takmicenjes { get; set; }
}