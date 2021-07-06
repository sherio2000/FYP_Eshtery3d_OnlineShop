using Core.Entities.Identity;
using Core.Entities.AdminAppUser;

namespace Core.Interfaces
{
    public interface ITokenService
    {
         string CreateToken(AppUser user);
         string AdminCreateToken(AdminAppUser user);
    }
}