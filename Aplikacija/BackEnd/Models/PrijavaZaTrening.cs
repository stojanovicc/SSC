using Models;

// public class PrijavaZaTrening
// {
//     [Key]
//     public int ID { get; set; }
//     public Student? Student { get; set; }
//     public Trening? Trening { get; set; }
//     public string Status { get; set; } = default!; //Accepted, Denied, Applied, Finished
//     public DateTime Date { get; set; }

// }
public class PrijavaZaTrening
{
    [Key]
    public int ID { get; set; }
    //public required string StudentID { get; set; }
    // public required string ImeStudenta { get; set; }
    // public required string PrezimeStudenta { get; set; }
    public Student Student { get; set; } = default!;
    // public int TreningID { get; set; }
    public Trening Trening { get; set; } = default!;
}
