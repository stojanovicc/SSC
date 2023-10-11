namespace Models;

public class SportskiSavez
{
    [Key]
    public int ID { get; set; }

    public List<Takmicenje>? Takmicenjes { get; set; }
}