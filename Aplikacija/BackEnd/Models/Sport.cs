namespace Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

public class Sport
{
    [Key]
    public int ID { get; set; }
    public required string Naziv { get; set; }



    [JsonIgnore]
    public List<PersonalInfoStudent> PersonalInfoStudents { get; set; } = default!;

    [JsonIgnore]
    public List<PersonalInfoTrener> PersonalInfoTreners { get; set; } = default!;

    [JsonIgnore]
    public List<Takmicenje>? Takmicenjes { get; set; }
}