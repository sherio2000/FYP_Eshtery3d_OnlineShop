using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Core.Entities.AdminAppUser;
using Core.Entities.Identity;
using System.Linq;

namespace Infrastructure.Admin
{
    public class AdminAppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AdminAppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var user = new AdminAppUser
                {
                    DisplayName = "Admin",
                    Email = "admin@gmail.com",
                    UserName = "Admin"
                };
                await userManager.CreateAsync(user, "Admin!1");
            }
        }

    }
}