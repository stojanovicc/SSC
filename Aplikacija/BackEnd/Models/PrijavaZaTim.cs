public class PrijavaZaTim
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public int TimId { get; set; }
         public List<Student>? Student { get; set; }
        public required string ImeStudenta { get; set; }
        public required string PrezimeStudenta { get; set; }
    }