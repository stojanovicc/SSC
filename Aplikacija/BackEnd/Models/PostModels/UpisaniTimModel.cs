namespace Models;

public class UpisaniTimModel
{
    [Key]
    public int ID { get; set; }
    public required string NazivTima { get; set; }
    public required string Fakultet { get; set; }
    public required string Sport { get; set; }
//     public List<Student>? Students { get; set; }
//     public List<Trener>? Treners { get; set; }
 }