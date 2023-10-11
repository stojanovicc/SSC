namespace Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

public class Fakultet
{
    [Key]
    public int ID { get; set; }
    public required string NazivFakulteta { get; set; }
    public required string Grad { get; set; }
    public required string Univerzitet { get; set; }


    [JsonIgnore]
    public PersonalInfoStudent PersonalInfoStudent { get; set; } = default!;
 //   public List<Student>? Students { get; set; }
}