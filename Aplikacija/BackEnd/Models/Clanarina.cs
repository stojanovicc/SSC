namespace Models;

public class Clanarina
{
    [Key]
    public int ID { get; set; }
    public required double Cena { get; set; }
    public required string Mesec { get; set; }

    //public required bool DaLiJePlacena { get; set; }
    public List<PlaceneClanarine>? PlaceneClanarine { get; set; }
    public List<Student>? Students { get; set; }
}