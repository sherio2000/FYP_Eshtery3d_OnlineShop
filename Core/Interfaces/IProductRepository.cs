using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IProductRepository
    {
        Task<int> getProductsCount();
        Task<int> getProductTypesCount();
        Task<int> getProductColorsCount();
        Task<int> getProductCategoriesCount();
        Task<int> getProductBrandsCount();
        Task updateProductCategory(int id, ProductCategory category);
        Task updateProductColor(int id, ProductColor color);
        Task updateProductBrand(int id, ProductBrand brand);
        Task updateProductType(int id, ProductType type);
        Task<ProductColor> AddProductColor(ProductColor color);
        Task<ProductBrand> AddProductBrand(ProductBrand brand);
        Task<ProductType> AddProductType(ProductType brand);
        Task<ProductCategory> AddProductCategory(ProductCategory category);
        Task UpdateProduct(int id, Product product);
        Task RemoveProduct(int id);
        Task RemoveColor(int id);
        Task RemoveBrand(int id);
        Task RemoveCategory(int id);
        Task RemoveType(int id);
        Task<Product> AddProduct(Product product);
        Task<Product> GetProductByIdAsync(int id);   
        Task<IReadOnlyList<Product>> GetProductsAsync();
        Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync();
        Task<IReadOnlyList<Product>> GetProductTypesAsync();
    }
}