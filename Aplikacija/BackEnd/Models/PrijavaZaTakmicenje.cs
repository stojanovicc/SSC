using Models;

public class PrijavaZaTakmicenje
{
    [Key]
    public int ID { get; set; }
    public Student Student { get; set; } = default!;
    public Takmicenje Takmicenje { get; set; } = default!;

    public string Status { get; set; } = default!; //Accepted, Denied, Applied, Finished
    public DateTime Date { get; set; }

}