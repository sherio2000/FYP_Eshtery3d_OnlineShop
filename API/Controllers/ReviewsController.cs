
using Core.Entities;
using Core.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Dtos;
using AutoMapper;
using API.Errors;
using Microsoft.AspNetCore.Identity;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Http;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers 
{
    public class ReviewsController : BaseApiController
    {
        private readonly IGenericRepository<Reviews> reviewsRepo;
        private readonly IReviewsRepository reviewsRepository;
        private readonly IMapper mapper;
        private readonly UserManager<AppUser> userManager;

        public ReviewsController(IGenericRepository<Reviews> reviewsRepo, IReviewsRepository reviewsRepository, IMapper mapper
        , UserManager<AppUser> userManager)
        {
            this.reviewsRepo = reviewsRepo;
            this.reviewsRepository = reviewsRepository;
            this.mapper = mapper;
            this.userManager = userManager;
        }

        [HttpPost]
        public async Task<ActionResult<IReadOnlyList<ReviewsDto>>> AddReview(ReviewsDto review)
        {
            var AddReview = this.mapper.Map<ReviewsDto, Reviews>(review);
            var newReview = await this.reviewsRepository.AddReview(AddReview);
            if(newReview == null) {
                return BadRequest(new ApiResponse(400, "Problem Adding Review"));
            }
            return Ok(newReview);
        }

        [HttpGet("{productId}")]
        public async Task<ActionResult<IReadOnlyList<ReviewsDto>>> getReviews(int productId)
        {
            var review = await this.reviewsRepository.GetReviews(productId);
            if (review == null) return NotFound(new ApiResponse(404));
            var data =  this.mapper.Map<IReadOnlyList<Reviews>, IReadOnlyList<ReviewsDto>>(review);
            return Ok(data);
        }

        [Authorize]
        [HttpGet("reviewed/{productId}")]
        public async Task<int> getReviewed(int productId)
        {
            var user = await this.userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);
            return await this.reviewsRepository.getReviewed(user.DisplayName, productId);
        }

        [HttpGet("rate/{productId}")]
        public async Task<ActionResult<decimal>> getProductRate(int productId)
        {
            try{
                 return await this.reviewsRepository.getProductRating(productId);
             }
             catch{
                 return 5;
             }
            
        }

        [HttpGet("reviewCount/{productId}")]
        public async Task<ActionResult<int>> getReviewsCount(int productId)
        {
            return await this.reviewsRepository.getReviewsCount(productId);
        }
    }
}