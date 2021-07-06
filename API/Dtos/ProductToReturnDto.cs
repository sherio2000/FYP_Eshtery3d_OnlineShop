namespace API.Dtos
{
    public class ProductToReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Specifications { get; set; }
        public string Product3dUrl { get; set; }
        public decimal Price { get; set; }
        public decimal ProductDiscount { get; set; }
        public string ProductVideoUrl { get; set;}
        public string PictureUrl { get; set; }
        public string PictureUrl1 { get; set; }
        public string PictureUrl2 { get; set; }
        public string PictureUrl3 { get; set; }
        public string PictureUrl4 { get; set; }
        public string ProductType { get; set; }
        public string ProductBrand { get; set; }
        public string ProductColor { get; set; }
        public string ProductCategory { get; set; }
        
    }
}