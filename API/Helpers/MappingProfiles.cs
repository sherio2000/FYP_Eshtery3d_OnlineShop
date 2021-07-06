using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
                .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
                .ForMember(d => d.ProductColor, o => o.MapFrom(s => s.ProductColor.Name))
                .ForMember(d => d.ProductCategory, o => o.MapFrom(s => s.ProductCategory.Name))
                .ForMember(d => d.PictureUrl, o => o.MapFrom<ProductUrlResolver>())
                .ForMember(d => d.PictureUrl1, o => o.MapFrom<ProductUrl1Resolver>())
                .ForMember(d => d.PictureUrl2, o => o.MapFrom<ProductUrl2Resolver>())
                .ForMember(d => d.PictureUrl3, o => o.MapFrom<ProductUrl3Resolver>())
                .ForMember(d => d.PictureUrl4, o => o.MapFrom<ProductUrl4Resolver>())
                .ForMember(d => d.Product3dUrl, o => o.MapFrom<Product3dUrlResolver>());
            CreateMap<Core.Entities.Identity.Address, AddressDto>().ReverseMap();    
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<UserMeasurementsDto, UserMeasurments>().ReverseMap();
            CreateMap<BasketItemDto, BasketItem>();
            CreateMap<ReviewsDto,Reviews>().ReverseMap();
            CreateMap<RegisterDto, AppUser>().ReverseMap();
            CreateMap<AddProductDto, Product>().ReverseMap();
            CreateMap<DeliveryMethodDto, DeliveryMethod>().ReverseMap();
            CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();
            CreateMap<Order, OrderToReturnDto>()
                .ForMember(d => d.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
                .ForMember(d => d.ShippingPrice, o => o.MapFrom(s => s.DeliveryMethod.Price)).ReverseMap(); 
            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(d => d.ProductId, o => o.MapFrom(s => s.ItemOrdered.ProductItemId))
                .ForMember(d => d.ProductName, o => o.MapFrom(s => s.ItemOrdered.ProductName))
                .ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.ItemOrdered.PictureUrl ))
                .ForMember(d => d.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>());
        }
    }
}