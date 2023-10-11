namespace Models;

    public class TakmicenjeModel
    {
        [Key]
        public int ID { get; set; }
        public required string NazivTakmicenja { get; set; } 
        public required string MestoOdrzavanja { get; set; }
        public required string DatumOdrzavanja { get; set; }

         public List<string> Sports { get; set; } = default!; //ovde je lista tip STRING a ne SPORT
    }
