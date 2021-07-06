using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        [RegularExpression("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$", ErrorMessage = "Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.")]
        public string Password { get; set; }
        
        [Required]
        public int Age { get; set; }
        
        [Required]
        public string Gender { get; set; }
        
        [Required]
        public string BirthDate { get; set; }
        
        [Required]
        public string FirstName { get; set; }
        
        [Required]
        public string LastName { get; set; }
        
        [Required]
        public AddressDto AddressDetails { get; set; }

        [Required]
        public string PhoneNumber1 { get; set; }

        public string PhoneNumber2 { get; set; }

        public UserMeasurementsDto Measurements { get; set;}

    }
}