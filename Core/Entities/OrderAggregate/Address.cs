namespace Core.Entities.OrderAggregate
{
    public class Address
    {
        public Address()
        {
        }

        public Address(string firstName, string lastName, string streetName, string address1, string address2, string city)
        {
            FirstName = firstName;
            LastName = lastName;
            StreetName = streetName;
            Address1 = address1;
            Address2 = address2;
            City = city;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string StreetName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
    }
}