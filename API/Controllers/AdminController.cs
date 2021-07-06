using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.AdminAppUser;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AdminController : BaseApiController
    {
        private readonly UserManager<AdminAppUser> userManager;
        private readonly SignInManager<AdminAppUser> signInManager;
        private readonly ITokenService tokenService;
        private readonly IMapper mapper;
        public AdminController(UserManager<AdminAppUser> userManager, SignInManager<AdminAppUser> signInManager, ITokenService tokenService, IMapper mapper)
        {
            this.mapper = mapper;
            this.tokenService = tokenService;
            this.signInManager = signInManager;
            this.userManager = userManager;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<AdminUserDto>> GetCurrentAdminUser()
        {

            var user = await this.userManager.FindAdminByEmailFromClaimsPrinciple(HttpContext.User);

            return new AdminUserDto
            {
                Email = user.Email,
                UserName = user.DisplayName,
                Token = this.tokenService.AdminCreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<AdminUserDto>> Login(AdminLoginDto loginDto)
        {
            var user = await this.userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized(new ApiResponse(401));

            var result = await this.signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

            return new AdminUserDto
            {
                Email = user.Email,
                Token = this.tokenService.AdminCreateToken(user),
                UserName = user.DisplayName
            };
        }

    }
}