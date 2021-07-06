using System.Text;
using Core.Entities.Identity;
using Infrastructure.Admin;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Core.Entities.AdminAppUser;

namespace API.Extensions
{
    public static class AdminIdentityServiceExtensions
    {
         public static IServiceCollection AddAdminIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            var builder = services.AddIdentityCore<AdminAppUser>();
            builder = new IdentityBuilder(builder.UserType, builder.Services);
            builder.AddEntityFrameworkStores<AdminIdentityDbContext>();
            builder.AddSignInManager<SignInManager<AdminAppUser>>();
            return services;
        }
    }
}