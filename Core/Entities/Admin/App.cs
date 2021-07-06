using Microsoft.AspNetCore.Identity;

namespace Core.Entities.AdminAppUser
{
    public class AdminAppUser : IdentityUser
    {
        public string DisplayName { get; set; }
    }
}