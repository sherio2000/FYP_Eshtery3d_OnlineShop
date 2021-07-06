using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;

namespace Infrastructure.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext context;
        private readonly IUnitOfWork unitOfWork;
        public ProductRepository(StoreContext context, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.context = context;

        }

        public async Task<Product> AddProduct(Product product)
        {
            var newProduct = new Product()
            {
                Name = product.Name,
                Description = product.Description,
                Specifications = product.Specifications,
                Product3dUrl = product.Product3dUrl,
                ProductTypeId = product.ProductTypeId,
                ProductCategoryId = product.ProductCategoryId,
                ProductColorId = product.ProductColorId,
                ProductBrandId = product.ProductBrandId,
                Price = product.Price,
                PictureUrl = product.PictureUrl,
                PictureUrl1 = product.PictureUrl1,
                PictureUrl2 = product.PictureUrl2,
                PictureUrl3 = product.PictureUrl3,
                PictureUrl4 = product.PictureUrl4,
                ProductDiscount = product.ProductDiscount
            };
            this.context.Products.Add(newProduct);
            await this.context.SaveChangesAsync();
            return newProduct;
        }

        public async Task<ProductColor> AddProductColor(ProductColor color) {
            var newColor = new ProductColor {
                Name = color.Name
            };
            this.context.ProductColors.Add(newColor);
            await this.context.SaveChangesAsync();
            return newColor;
        }

        public async Task RemoveColor(int id) {
            var color = await this.context.ProductColors.FirstOrDefaultAsync(x => x.Id == id);
            this.context.ProductColors.Remove(color);
            await this.context.SaveChangesAsync();
        }

        public async Task<ProductCategory> AddProductCategory(ProductCategory category) {
            var newCategory = new ProductCategory {
                Name = category.Name
            };
            this.context.ProductCategory.Add(newCategory);
            await this.context.SaveChangesAsync();
            return newCategory;
        }

        public async Task<ProductBrand> AddProductBrand(ProductBrand brand) {
            var newBrand = new ProductBrand {
                Name = brand.Name
            };
            this.context.ProductBrands.Add(newBrand);
            await this.context.SaveChangesAsync();
            return newBrand;
        }

        public async Task<ProductType> AddProductType(ProductType productType) {
            var newProductType = new ProductType {
                Name = productType.Name
            };
            this.context.ProductTypes.Add(newProductType);
            await this.context.SaveChangesAsync();
            return newProductType;
        }

        public async Task RemoveCategory(int id) {
            var category = await this.context.ProductCategory.FirstOrDefaultAsync(x => x.Id == id);
            this.context.ProductCategory.Remove(category);
            await this.context.SaveChangesAsync();
        }
        public async Task RemoveType(int id) {
            var type = await this.context.ProductTypes.FirstOrDefaultAsync(x => x.Id == id);
            this.context.ProductTypes.Remove(type);
            await this.context.SaveChangesAsync();
        }

        public async Task RemoveBrand(int id) {
            var brand = await this.context.ProductBrands.FirstOrDefaultAsync(x => x.Id == id);
            this.context.ProductBrands.Remove(brand);
            await this.context.SaveChangesAsync();
        }

        public async Task RemoveProduct(int id) {
            // var product = await this.context.Products.SingleAsync(a => a.Id == id);
            var productt = await this.context.Products.FirstOrDefaultAsync(x => x.Id == id);
            this.context.Products.Remove(productt);
            await this.context.SaveChangesAsync();
        }

        public async Task UpdateProduct(int id, Product updatedProduct) {
            Product product = await this.context.Products.FirstOrDefaultAsync(x => x.Id == id);
            // var product = await this.context.Products.FirstOrDefaultAsync(x => x.Id == id);
            if(updatedProduct.Name != product.Name && updatedProduct.Name != "") {
                product.Name = updatedProduct.Name;
            }
            if(updatedProduct.Description != product.Description && updatedProduct.Description != "") {
                product.Description = updatedProduct.Description;
            }
            if(updatedProduct.Specifications != product.Specifications && updatedProduct.Specifications != "") {
                product.Specifications = updatedProduct.Specifications;
            }
            if(updatedProduct.PictureUrl != product.PictureUrl && updatedProduct.PictureUrl != "") {
                product.PictureUrl = updatedProduct.PictureUrl;
            }
            if(updatedProduct.PictureUrl1 != product.PictureUrl1){
                product.PictureUrl1 = updatedProduct.PictureUrl1;
            }
            if(updatedProduct.PictureUrl2 != product.PictureUrl2){
                product.PictureUrl2 = updatedProduct.PictureUrl2;
            }
            if(updatedProduct.PictureUrl3 != product.PictureUrl3){
                product.PictureUrl3 = updatedProduct.PictureUrl3;
            }
            if(updatedProduct.PictureUrl4 != product.PictureUrl4){
                product.PictureUrl4 = updatedProduct.PictureUrl4;
            }
            if(updatedProduct.Price != product.Price && updatedProduct.Price != 1) {
                product.Price = updatedProduct.Price;
            }
            if(updatedProduct.ProductDiscount + Convert.ToDecimal(0.0) != product.ProductDiscount) {
                product.ProductDiscount = updatedProduct.ProductDiscount;
            }
            if(updatedProduct.ProductBrandId != 0) {
                product.ProductBrandId = updatedProduct.ProductBrandId;
            }
            if(updatedProduct.ProductCategoryId != 0) {
                product.ProductCategoryId = updatedProduct.ProductCategoryId;
            }
            if(updatedProduct.ProductTypeId != 0) {
                product.ProductTypeId = updatedProduct.ProductTypeId;
            }
            if(updatedProduct.ProductColorId != 0) {
                product.ProductColorId = updatedProduct.ProductColorId;
            }
            if(updatedProduct.Product3dUrl != product.Product3dUrl && updatedProduct.Product3dUrl != "nil"){
                product.Product3dUrl = updatedProduct.Product3dUrl;
            }
            await this.context.SaveChangesAsync();
        
        }

        public async Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync()
        {
            return await this.context.ProductBrands.ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await this.context.Products
            .Include(p => p.ProductType)
            .Include(p => p.ProductBrand)
            .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        {
            return await this.context.Products
            .Include(p => p.ProductType)
            .Include(p => p.ProductBrand)
            .ToListAsync();
        }

        public async Task<IReadOnlyList<ProductType>> GetProductTypesAsync()
        {
            return await this.context.ProductTypes.ToListAsync();
        }

        Task<IReadOnlyList<Product>> IProductRepository.GetProductTypesAsync()
        {
            throw new System.NotImplementedException();
        }

        public async Task updateProductCategory(int id, ProductCategory updatedCategory)
        {
            ProductCategory ccategory = await this.context.ProductCategory.FirstOrDefaultAsync(x => x.Id == id);
            if(updatedCategory.Name != ccategory.Name || updatedCategory.Name == "") {
                ccategory.Name = updatedCategory.Name;
            }
            await this.context.SaveChangesAsync();
        }

        public async Task updateProductColor(int id, ProductColor updatedColor)
        {
            ProductColor ccolor = await this.context.ProductColors.FirstOrDefaultAsync(x => x.Id == id);
            if(updatedColor.Name != ccolor.Name || updatedColor.Name == "") {
                ccolor.Name = updatedColor.Name;
            }
            await this.context.SaveChangesAsync();
        }

        public async Task updateProductBrand(int id, ProductBrand updatedBrand)
        {
            ProductBrand cbrand = await this.context.ProductBrands.FirstOrDefaultAsync(x => x.Id == id);
            if(updatedBrand.Name != cbrand.Name || updatedBrand.Name == "") {
                cbrand.Name = updatedBrand.Name;
            }
            await this.context.SaveChangesAsync();
        }

        public async Task updateProductType(int id, ProductType updatedType)
        {
            ProductType ctype = await this.context.ProductTypes.FirstOrDefaultAsync(x => x.Id == id);
            if(updatedType.Name != ctype.Name || updatedType.Name == "") {
                ctype.Name = updatedType.Name;
            }
            await this.context.SaveChangesAsync();
        }

        public Task<int> getProductsCount()
        {
            var count = this.context.Products.CountAsync();
            return count; 
        }

        public Task<int> getProductTypesCount()
        {
            var count = this.context.ProductTypes.CountAsync();
            return count; 
        }

        public Task<int> getProductColorsCount()
        {
            var count = this.context.ProductColors.CountAsync();
            return count; 
        }

        public Task<int> getProductCategoriesCount()
        {
            var count = this.context.ProductCategory.CountAsync();
            return count; 
        }

        public Task<int> getProductBrandsCount()
        {
            var count = this.context.ProductBrands.CountAsync();
            return count; 
        }
    }
}