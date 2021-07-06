using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities.AdminAppUser;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class AdminUserManagerExtensions
    {
        public static async Task<AdminAppUser> FindAdminByEmailFromClaimsPrinciple(this UserManager<AdminAppUser> input, ClaimsPrincipal user)
        {
            var email = user?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            return await input.Users.SingleOrDefaultAsync(x => x.Email == email);
        }
    }
}