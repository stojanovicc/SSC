using Models;

public class UpisaniTim//kao prijava za takmicenje-nase prijaza za trening
{
    [Key]
    public int ID { get; set; }
    //public required string StudentID { get; set; }
    // public required string ImeStudenta { get; set; }
    // public required string PrezimeStudenta { get; set; }
    public Student Student { get; set; } = default!;
    // public int TreningID { get; set; }
    public Tim Tim { get; set; } = default!;
}
