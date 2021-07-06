namespace API.Dtos
{
    public class ReviewsDto
    {
        public int Id { get; set;}
        public int ProductId { get; set;}
        public string UserName { get; set; }
        public string Review { get; set; }
        public decimal Rate { get; set; }
    }
}