using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;

namespace Infrastructure.Data
{
    public class ReviewsRepository : IReviewsRepository
    {
        private readonly StoreContext context;
        private readonly IUnitOfWork unitOfWork;

        public ReviewsRepository(StoreContext context, IUnitOfWork unitOfWork) 
        {
            this.context = context;
            this.unitOfWork = unitOfWork;
        }

        public async Task<Reviews> AddReview(Reviews reviews)
        {
            var newReview = new Reviews()
            {
                UserName = reviews.UserName,
                ProductId = reviews.ProductId,
                Review = reviews.Review,
                Rate = reviews.Rate
            };
            this.context.Reviews.Add(newReview);
            await this.context.SaveChangesAsync();
            return newReview;
        }

        public async Task<decimal> getProductRating(int ProductId)
        {
            return await this.context.Reviews.Where(x => x.ProductId.Equals(ProductId)).AverageAsync(x => x.Rate);
        }

        public async Task<IReadOnlyList<Reviews>> GetReviews(int ProductId)
        {
            return await this.context.Reviews.Where(x => x.ProductId == ProductId).ToListAsync();
        }

        public async Task<int> getReviewed(string username, int productId) 
        {
            return await this.context.Reviews.Where(x => x.ProductId == productId).Where(x => x.UserName == username).CountAsync();
        }

        public async Task<int> getReviewsCount(int ProductId)
        {
            return await this.context.Reviews.Where(c => c.ProductId == ProductId).CountAsync();
        }
    }
}