namespace Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class PersonalInfoTrener
{
    [Key]
    public int ID { get; set; }
    public required string PhoneNumber { get; set; }
    public required string Address { get; set; }
    public required string City { get; set; }
    //public required string Sport { get; set; }


    public List<Sport> Sports { get; set; } = default!;  
}

