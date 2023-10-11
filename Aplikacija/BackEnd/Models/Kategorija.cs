namespace Models;

public class Kategorija
{
    [Key]
    public int ID { get; set; }
    public required string NazivKategorije { get; set; }
    [JsonIgnore]
    public List<Sport>? Sports { get; set; }
}