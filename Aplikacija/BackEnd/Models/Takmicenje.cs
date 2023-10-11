namespace Models;

public class Takmicenje
{
    [Key]
    public int ID { get; set; }
    public required string NazivTakmicenja { get; set; }
    public required string MestoOdrzavanja { get; set; }
    public required string DatumOdrzavanja { get; set; }


    public List<PrijavaZaTakmicenje>? PrijavaZaTakmicenje { get; set; }
    public List<Student>? Students { get; set; }
    public Zaposleni? Zaposleni { get; set; }
    public List<Sport>? Sports { get; set; }
}
