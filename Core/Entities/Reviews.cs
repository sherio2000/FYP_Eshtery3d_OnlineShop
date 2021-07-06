namespace Core.Entities
{
    public class Reviews : BaseEntity
    {
        public int ProductId { get; set;}
        public string UserName { get; set; }
        public string Review { get; set; }
        public decimal Rate { get; set; }
    }
}