public class PlaceneClanarine
{
    public int ID { get; set; }
    public string? Ime { get; set; }
    public string? Prezime { get; set; }
    public string? BrojKartice { get; set; }
    public string? Cvv { get; set; }
    public int ClanarinaId { get; set; }
    public List<Student>? Student { get; set; }
}
