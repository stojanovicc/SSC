namespace Models;

public class ZakazaniTreningModel
{
    [Key]
    public int ID { get; set; }
    public required DateTime Datum { get; set; }
    public required string Vreme { get; set; }
    public required string Mesto { get; set; }
    
    public required List<string> Sports { get; set; } 
}