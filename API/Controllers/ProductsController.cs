using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Core.Interfaces;
using Core.Specifications;
using API.Dtos;
using System.Linq;
using AutoMapper;
using API.Errors;
using Microsoft.AspNetCore.Http;
using API.Helpers;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        // here i am injecting storecontext in order to access the function to retrieve data using API 
        private readonly IGenericRepository<Product> productsRepo;
        private readonly IGenericRepository<ProductBrand> productBrandRepo;
        private readonly IGenericRepository<ProductType> productTypeRepo;
        private readonly IMapper mapper;
        private readonly IGenericRepository<ProductColor> productColorRepo;
        private readonly IGenericRepository<ProductCategory> productCategoryRepo;
        private readonly IProductRepository productRepository;

        public ProductsController(IGenericRepository<Product> productsRepo,
        IGenericRepository<ProductBrand> productBrandRepo,
        IGenericRepository<ProductType> productTypeRepo, IMapper mapper, IGenericRepository<ProductColor> productColorRepo, IGenericRepository<ProductCategory> productCategoryRepo,
        IProductRepository productRepository)
        {
            this.productCategoryRepo = productCategoryRepo;
            this.productColorRepo = productColorRepo;
            this.mapper = mapper;
            this.productTypeRepo = productTypeRepo;
            this.productBrandRepo = productBrandRepo;
            this.productsRepo = productsRepo;
            this.productRepository = productRepository;
        }


        [HttpDelete]
        public async Task DeleteProduct(int id) 
        {
            await this.productRepository.RemoveProduct(id);
        }

        [HttpDelete("color")]
        public async Task DeleteColor(int id) {
            await this.productRepository.RemoveColor(id);
        }
        [HttpDelete("category")]
        public async Task DeleteCategory(int id) {
            await this.productRepository.RemoveCategory(id);
        }
        [HttpDelete("type")]
        public async Task DeleteType(int id) {
            await this.productRepository.RemoveType(id);
        }
        [HttpDelete("brand")]
        public async Task DeleteBrand(int id) {
            await this.productRepository.RemoveBrand(id);
        }



        [HttpPut]
        public async Task UpdateProduct(AddProductDto product) 
        {
            var UpdateProduct = this.mapper.Map<AddProductDto, Product>(product);
        
            await this.productRepository.UpdateProduct(product.Id, UpdateProduct); 
        }

        [HttpPut("category")]
        public async Task UpdateCategory(ProductCategory category) {
            await this.productRepository.updateProductCategory(category.Id,category);
        }

        [HttpPut("color")]
        public async Task Updatecolor(ProductColor color) {
            await this.productRepository.updateProductColor(color.Id,color);
        }

        [HttpPut("type")]
        public async Task UpdateType(ProductType type) {
            await this.productRepository.updateProductType(type.Id,type);
        }

        [HttpPut("brand")]
        public async Task UpdateType(ProductBrand brand) {
            await this.productRepository.updateProductBrand(brand.Id,brand);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await this.productsRepo.GetEntityWithSpec(spec);
            if (product == null) return NotFound(new ApiResponse(404));
            return this.mapper.Map<Product, ProductToReturnDto>(product);
        }

        
        [HttpGet("category/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductCategory>> GetCategory(int id)
        {
            var category = await this.productCategoryRepo.GetByIdAsync(id);
            if (category == null) return NotFound(new ApiResponse(404));
            return category;
        }

        [HttpGet("color/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductColor>> GetColor(int id)
        {
            var color = await this.productColorRepo.GetByIdAsync(id);
            if (color == null) return NotFound(new ApiResponse(404));
            return color;
        }

        [HttpGet("type/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductType>> GetType(int id)
        {
            var type = await this.productTypeRepo.GetByIdAsync(id);
            if (type == null) return NotFound(new ApiResponse(404));
            return type;
        }

        [HttpGet("brand/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductBrand>> GetBrand(int id)
        {
            var brand = await this.productBrandRepo.GetByIdAsync(id);
            if (brand == null) return NotFound(new ApiResponse(404));
            return brand;
        }
        

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await this.productBrandRepo.ListAllSync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await this.productTypeRepo.ListAllSync());
        }
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts(
            [FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(productParams);
            var countSpec = new ProductWithFiltersForCountSpecification(productParams);
            var totalItems = await this.productsRepo.CountAsync(countSpec);
            var products = await this.productsRepo.ListAsync(spec);
            var data = this.mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);
            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }

        [HttpGet("colors")]
        public async Task<ActionResult<IReadOnlyList<ProductColor>>> GetProductColors()
        {
            return Ok(await this.productColorRepo.ListAllSync());
        }
        [HttpGet("categories")]
        public async Task<ActionResult<IReadOnlyList<ProductCategory>>> GetProductCategories()
        {
            return Ok(await this.productCategoryRepo.ListAllSync());
        }

        [HttpGet("product_count")]
        public async Task<int> getProductCount()
        {
            return await this.productRepository.getProductsCount();
        }
        [HttpGet("productColors_count")]
        public async Task<int> getProductColorCount()
        {
            return await this.productRepository.getProductColorsCount();
        }
        [HttpGet("productCategories_count")]
        public async Task<int> getProductCategories()
        {
            return await this.productRepository.getProductCategoriesCount();
        }
        [HttpGet("productBrands_count")]
        public async Task<int> getProductBrandsCount()
        {
            return await this.productRepository.getProductBrandsCount();
        }
        [HttpGet("productTypes_count")]
        public async Task<int> getProductTypesCount()
        {
            return await this.productRepository.getProductTypesCount();
        }







        //POST METHODS

        [HttpPost("productColor")]
        public async Task<ActionResult<IReadOnlyList<ProductColor>>> AddProductColor(ProductColor color)
        {
            return Ok(await this.productRepository.AddProductColor(color));
        }
        [HttpPost("productCategory")]
        public async Task<ActionResult<IReadOnlyList<ProductCategory>>> AddProductCategory(ProductCategory category)
        {
            return Ok(await this.productRepository.AddProductCategory(category));
        }
        [HttpPost("productBrand")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> AddProductBrand(ProductBrand brand)
        {
            return Ok(await this.productRepository.AddProductBrand(brand));
        }
        [HttpPost("productType")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> AddProductType(ProductType type)
        {
            return Ok(await this.productRepository.AddProductType(type));
        }
        [HttpPost("add")]
        public async Task<ActionResult<AddProductDto>> AddProduct(AddProductDto product)
        {
            var AddProduct = this.mapper.Map<AddProductDto, Product>(product);
            var newProduct = await this.productRepository.AddProduct(AddProduct);
            if(newProduct == null) {
                return BadRequest(new ApiResponse(400, "Problem Adding Product"));
            }
            return Ok(newProduct);
        }



    }
}