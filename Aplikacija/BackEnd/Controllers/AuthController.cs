namespace WebTemplate.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    public Context Context { get; set; }
    public UserManager<ApplicationUser> UserManager { get; set; }
    public SignInManager<ApplicationUser> SignInManager { get; set; }
    public RoleManager<IdentityRole> RoleManager { get; set; }
    public AuthController(Context context, UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInMenager, RoleManager<IdentityRole> roleManager)
        {
            Context = context;
            UserManager = userManager;
            SignInManager = signInMenager;
            RoleManager = roleManager;
        }

        [Route("Register")]
        [HttpPost]
        public async Task<JsonResult> Register([FromBody] RegisterModel info)
        {
            if (!ModelState.IsValid)
            {
                var modelErrors = new List<string>();
                foreach (var modelState in ModelState.Values)
                {
                    foreach (var modelError in modelState.Errors)
                    {
                        modelErrors.Add(modelError.ErrorMessage);
                    }
                }
                return new JsonResult(new { succeeded = false, errors = modelErrors });
            }

            ApplicationUser user;
            if ((int)info.Role == 1)
            {
                user = new Student
                {
                    UserName = info.Username,
                    Email = info.Email,
                    Ime = info.FirstName,
                    Prezime = info.LastName,
                    Slika = "",
                    PersonalInfoStudent = new PersonalInfoStudent
                    {
                        Sports = new List<Sport>(),
                        Fakultets = new List<Fakultet>(),
                        PhoneNumber = "",
                        Address = "",
                        City = ""
                    }
                };
            }
            else if ((int)info.Role == 2)
            {
                user = new Trener
                {
                    UserName = info.Username,
                    Email = info.Email,
                    ImeT = info.FirstName,
                    PrezimeT = info.LastName,
                    Slika = "",
                    PersonalInfoTrener = new PersonalInfoTrener
                    {
                        Sports = new List<Sport>(),
                        PhoneNumber = "",
                        Address = "",
                        City = ""
                    }
                };
            }
            else if ((int)info.Role == 3)
            {
                user = new Zaposleni
                {
                    UserName = info.Username,
                    Email = info.Email,
                    ImeZ = info.FirstName,
                    PrezimeZ = info.LastName,
                    Slika = ""
                };
            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Role not recognized" });
            }

            var result = await UserManager.CreateAsync(user, info.Password);
            if (info.Role == Role.Student)
            {
                await AssignRoleToUser(user, "Student");
            }
            else if (info.Role == Role.Trener)
            {
                await AssignRoleToUser(user, "Trener");
            }
            else if (info.Role == Role.Zaposleni)
            {
                await AssignRoleToUser(user, "Zaposleni");
            }
            if (result.Succeeded)
            {
                //await Context.SaveChangesAsync();
                return new JsonResult(new { succeeded = true });
            }
            else
            {
                var err = new List<string>();
                foreach (var e in result.Errors)
                {
                    err.Add(e.Description);
                }
                return new JsonResult(new { succeeded = false, errors = result.Errors });
            }
        }

        [Route("AddAdmin/{email}/{username}/{password}/{key}")]
        [HttpPost]
        public async Task<JsonResult> AddAdmin(string email, string username, string password, string key)
        {
            if (!ModelState.IsValid)
            {
                var modelErrors = new List<string>();
                foreach (var modelState in ModelState.Values)
                {
                    foreach (var modelError in modelState.Errors)
                    {
                        modelErrors.Add(modelError.ErrorMessage);
                    }
                }
                return new JsonResult(new { succeeded = false, errors = modelErrors });
            }

            if (key != "INTERNCLIXADMINKEY")
            {
                return new JsonResult(new { succeeded = false, errors = "Invalid admin key" });
            }

            ApplicationUser user = new Administrator
            {
                UserName = username,
                Email = email,
            };
            var result = await UserManager.CreateAsync(user, password);
            await AssignRoleToUser(user, "Admin");
            if (result.Succeeded)
            {
                //await Context.SaveChangesAsync();
                return new JsonResult(new { succeeded = true });
            }
            else
            {
                var err = new List<string>();
                foreach (var e in result.Errors)
                {
                    err.Add(e.Description);
                }
                return new JsonResult(new { succeeded = false, errors = result.Errors });
            }
        }

        //[EnableCors("CORS")]
        [HttpPost]
        [Route("Login")]
        public async Task<JsonResult> Login([FromBody] SignInModel info)
        {
            if (!ModelState.IsValid)
            {
                var modelErrors = new List<string>();
                foreach (var modelState in ModelState.Values)
                {
                    foreach (var modelError in modelState.Errors)
                    {
                        modelErrors.Add(modelError.ErrorMessage);
                    }
                }
                return new JsonResult(new { succeeded = false, errors = modelErrors });
            }
            var result = await SignInManager.PasswordSignInAsync(info.Username, info.Password, false, false);
            if (result.Succeeded)
            {
                return new JsonResult(new { succeeded = true });
            }
            List<string> err = new List<string>();
            err.Add("Username and password don't match");
            return new JsonResult(new { succeeded = false, errors = err });
        }

        [Authorize]
        [HttpPost]
        [Route("Logout")]
        public async Task<JsonResult> Logout()
        {
            await SignInManager.SignOutAsync();
            return new JsonResult(new { success = true });
        }

        [Route("CheckUser")]
        [HttpGet]
        public async Task<JsonResult> CheckUser()
        {
            ApplicationUser applicationUser = await UserManager.GetUserAsync(User);

            if (applicationUser == null)
                return new JsonResult(new { logged = false, user = applicationUser });

            var userRoles = await UserManager.GetRolesAsync(applicationUser);

            if (applicationUser is Student)
            {
                return new JsonResult(new
                {
                    logged = true,
                    user =
                    new
                    {
                        id = applicationUser.Id,
                        username = applicationUser.UserName,
                        email = applicationUser.Email,
                        ((Student)applicationUser).Slika,
                        firstname = ((Student)applicationUser).Ime,
                        lastname = ((Student)applicationUser).Prezime,
                        roles = userRoles
                    }
                });
            }
            else if (applicationUser is Trener)
            {
                return new JsonResult(new
                {
                    logged = true,
                    user =
                    new
                    {
                        id = applicationUser.Id,
                        username = applicationUser.UserName,
                        email = applicationUser.Email,
                        ((Trener)applicationUser).Slika,
                        firstname = ((Trener)applicationUser).ImeT,
                        lastname = ((Trener)applicationUser).PrezimeT,
                        roles = userRoles
                    }
                });
            }
            else if (applicationUser is Zaposleni)
            {
                return new JsonResult(new
                {
                    logged = true,
                    user =
                    new
                    {
                        id = applicationUser.Id,
                        username = applicationUser.UserName,
                        email = applicationUser.Email,
                        ((Zaposleni)applicationUser).Slika,
                        firstname = ((Zaposleni)applicationUser).ImeZ,
                        lastname = ((Zaposleni)applicationUser).PrezimeZ,
                        roles = userRoles
                    }
                });
            }
            else
            {
                return new JsonResult(new
                {
                    logged = true,
                    user =
                    new
                    {
                        id = applicationUser.Id,
                        username = applicationUser.UserName,
                        email = applicationUser.Email,
                        roles = userRoles
                    }
                });
            }

        }

        // [Authorize(Roles = "Admin")]
        // [Route("OpenForAdmin")]
        // [HttpGet]
        // public async Task<JsonResult> OpenForAdmin()
        // {
        //     var applicationUser = await UserManager.GetUserAsync(User);
        //     return new JsonResult(await UserManager.GetRolesAsync(applicationUser));
        // }

        // [Authorize(Roles = "Employer")]
        // [Route("OpenForEmployer")]
        // [HttpPost]
        // public async Task<JsonResult> OpenForEmployer()
        // {
        //     var applicationUser = await UserManager.GetUserAsync(User);
        //     return new JsonResult(await UserManager.GetRolesAsync(applicationUser));
        // }

        [HttpPost]
        public async Task<JsonResult> AssignRoleToUser(ApplicationUser user, string roleToAssign)
        {
            //var user = await UserManager.GetUserAsync(User);
            bool x = await RoleManager.RoleExistsAsync(roleToAssign);
            if (!x)
            {
                var role = new IdentityRole()
                {
                    Name = roleToAssign
                };
                await RoleManager.CreateAsync(role);
            }
            if (await UserManager.IsInRoleAsync(user, roleToAssign))
            {
                var err = new List<string>()
                {
                    "User is already an "+ roleToAssign
                };
                return new JsonResult(new { success = false, error = err });
            }
            await UserManager.AddToRoleAsync(user, roleToAssign);
            return new JsonResult(new { success = true });
        }        
}
