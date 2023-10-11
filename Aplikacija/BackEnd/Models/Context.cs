namespace Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

public class Context : IdentityDbContext<ApplicationUser>
{
        public required DbSet<Administrator> Administrators { get; set; }
        public required DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public required DbSet<Clanarina> Clanarinas { get; set; }
        public required DbSet<Fakultet> Fakultets { get; set; }
        public required DbSet<Sport> Sports { get; set; }
        public required DbSet<Kategorija> Kategorijas { get; set; }
        public required DbSet<PersonalInfoStudent> PersonalInfoStudents { get; set; }
        public required DbSet<PersonalInfoTrener> PersonalInfoTreners { get; set; }
        public required DbSet<SportskiSavez> SportskiSavezs { get; set; }
        public required DbSet<Student> Students { get; set; }
        public required DbSet<Takmicenje> Takmicenjes { get; set; }
        public required DbSet<Trener> Treners { get; set; }
        public required DbSet<Trening> Trenings { get; set; }
        public required DbSet<Zaposleni> Zaposlenis { get; set; }
        public required DbSet<PrijavaZaTakmicenje> PrijavaZaTakmicenjes { get; set; }
        public required DbSet<Message> Messages { get; set; }
        public required DbSet<PlaceneClanarine> PlaceneClanarine { get; set; }
        public required DbSet<Tim> Tims { get; set; }
        public required DbSet<ZakazaniTrening> ZakazaniTrenings { get; set; }
        public required DbSet<UpisaniTim> UpisaniTims { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }

    public Context(DbContextOptions options) : base(options)
    {
        
    }
}
