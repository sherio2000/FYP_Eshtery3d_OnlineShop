using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity
{
    public class AppUser : IdentityUser
    {        
        public string DisplayName { get; set; }
        public Address Address { get; set; }
        public UserMeasurments Measurements { get; set; }
        public string Gender { get; set; }
        public string BirthDate { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNum { get; set; }
        public string PhoneNum2 { get; set; }
        public bool Reviewed { get; set; } = false;
        public int Age {get; set;}
    }
}