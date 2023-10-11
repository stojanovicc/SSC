namespace Models
{
    public class SportModel
    {
        public int Id { get; set; }
        public string Label { get; set; } = "";
    }
    public class FakultetModel
    {
        public string NazivFakulteta { get; set; } = "";
        public string Grad { get; set; } = "";
        public string Univerzitet { get; set; } = "";
    }

    public class PersonalInfoStudentModel
    {
        public string Phone { get; set; } = "";
        public string Address { get; set; } = "";
        public string City { get; set; } = "";

        public List<FakultetModel> Fakultet { get; set; } = default!;
        public List<SportModel> Sports { get; set; } = default!;
    }

    public class PersonalInfoTrenerModel
    {
        public string Phone { get; set; } = "";
        public string Address { get; set; } = "";
        public string City { get; set; } = "";

        public List<SportModel> Sports { get; set; } = default!;
    }
}