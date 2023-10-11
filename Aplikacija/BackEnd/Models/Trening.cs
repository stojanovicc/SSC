namespace Models;

public class Trening
{
    [Key]
    public int ID { get; set; }
    public required DateTime Datum { get; set; }
    public required string Vreme { get; set; }
    public required string Mesto { get; set; }

    public List<Student>? Students { get; set; }
    public List<Trener>? Treners { get; set; }
    public List<PrijavaZaTrening>? PrijavaZaTrening { get; set; }
    public List<ZakazaniTrening>? ZakazaniTrening { get; set; }
}