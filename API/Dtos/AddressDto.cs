using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class AddressDto
    {

        [Required]
        public string StreetName { get; set; }

        [Required]
        public string Address1 { get; set; }

        public string Address2 { get; set; }
        
        [Required]
        public string City { get; set; }

        [Required]
        public string Country { get; set; }
    }
}