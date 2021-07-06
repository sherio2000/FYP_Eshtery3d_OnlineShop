using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager) {

            if(!userManager.Users.Any()) 
            {
                var user = new AppUser
                {
                    DisplayName = "Sherio",
                    Email = "sherio@gmail.com",
                    Age = 20,
                    Gender = "Male",
                    UserName = "sds",
                    BirthDate = "18/8/2000",
                    FirstName = "Sherif",
                    LastName = "Magdy",
                    Address = new Address 
                    {
                        FirstName = "Sherif",
                        LastName = "Magdy",
                        StreetName = "Modern Academy Street",
                        Address1 = "9413, el hadaba el wosta, modern academy street",
                        Address2 = "Mokkatam, cairo, egypt",
                        City = "Mokkatam"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            };
        }
    }
}