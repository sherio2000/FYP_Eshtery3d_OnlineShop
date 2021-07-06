using System.Linq;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> userManager;

        private readonly SignInManager<AppUser> signInManager;
        private readonly ITokenService tokenService;
        private readonly IMapper mapper;


        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper)
        {
            this.mapper = mapper;
            this.signInManager = signInManager;
            this.tokenService = tokenService;
            this.userManager = userManager;

        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {

            var user = await this.userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);
            var userAddress = await this.GetUserAddress();
            return new UserDto
            {
                Email = user.Email,
                Token = this.tokenService.CreateToken(user),
                DisplayName = user.DisplayName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Reviewed = user.Reviewed,
                Gender = user.Gender

            };
        }

        [HttpGet("user")]
        public async Task<ActionResult<UserDto>> GetUser(string email)
        {

            var user = await this.userManager.FindByEmailAsync(email);

            return new UserDto
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                BirthDate = user.BirthDate,
                Reviewed = user.Reviewed
            };
        }

        [HttpDelete]
        public async Task deleteUserByEmail(string email) {
            var user = await this.userManager.FindByEmailAsync(email);
            await this.userManager.DeleteAsync(user);
        }


        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await this.userManager.FindByEmailAsync(email) != null;
        }

        [HttpGet("userNamexists")]
        public async Task<ActionResult<bool>> CheckUserNameExistsAsync([FromQuery] string username)
        {
            return await this.userManager.FindByNameAsync(username) != null;
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var user = await this.userManager.FindByUserByClaimsPrincipalWithAddressAsync(HttpContext.User);
            return this.mapper.Map<Address, AddressDto>(user.Address);
        }

        [Authorize]
        [HttpGet("measurements")]
        public async Task<ActionResult<UserMeasurementsDto>> GetUserMeasurements()
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var user = await this.userManager.FindByUserByClaimsPrincipalWithMeasuresAsync(HttpContext.User);
            return this.mapper.Map<UserMeasurments, UserMeasurementsDto>(user.Measurements);
        }


        [HttpGet("userscount")]
        public int getUsersCount() {
            return this.userManager.Users.Count();
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
        {
            var user = await this.userManager.FindByUserByClaimsPrincipalWithAddressAsync(HttpContext.User);
            user.Address = this.mapper.Map<AddressDto, Address>(address);
            var result = await this.userManager.UpdateAsync(user);

            if(result.Succeeded) return Ok(this.mapper.Map<Address, AddressDto>(user.Address));

            return BadRequest("Problem Updating User");
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await this.userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized(new ApiResponse(401));

            var result = await this.signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

            return new UserDto
            {
                Email = user.Email,
                Token = this.tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse{Errors = new []{
                    "Email address already exists!"
                }});
            }
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                BirthDate = registerDto.BirthDate,
                UserName = registerDto.DisplayName,
                Gender = registerDto.Gender,
                PhoneNum = registerDto.PhoneNumber1,
                PhoneNum2 = registerDto.PhoneNumber2,
                Address = new Address
                {
                    City = registerDto.AddressDetails.City,
                    Country = registerDto.AddressDetails.Country,
                    StreetName = registerDto.AddressDetails.StreetName,
                    Address1 = registerDto.AddressDetails.Address1,
                    Address2 = registerDto.AddressDetails.Address2
                },
                Measurements = new UserMeasurments
                {
                    Hip = registerDto.Measurements.Hip,
                    Waist = registerDto.Measurements.Waist,
                    Neck = registerDto.Measurements.Neck,
                    Arm = registerDto.Measurements.Arm,
                    Bust = registerDto.Measurements.Bust,
                    Height = registerDto.Measurements.Height,
                    Weight = registerDto.Measurements.Weight,
                    Chest = registerDto.Measurements.Chest
                }
            };

            var result = await this.userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded) return BadRequest(new ApiResponse(400));

            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = this.tokenService.CreateToken(user),
                Email = user.Email
            };
        }
    }
}