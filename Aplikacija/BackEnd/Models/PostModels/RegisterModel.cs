using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Models
{
    public enum Role
    {
        Administrator,
        Student,
        Trener,
        Zaposleni
    }

    public class RegisterModel
    {
        [EmailAddress]
        public required String Email { get; set; }
        public required String Username { get; set; }
        [MinLength(6)]
        public required String Password { get; set; }
        public required String FirstName { get; set; }
        public required String LastName { get; set; }
        public required Role Role { get; set; }
    }

}