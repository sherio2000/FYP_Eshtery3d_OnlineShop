using Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IReviewsRepository
    {
        Task<Reviews> AddReview(Reviews reviews);
        Task<IReadOnlyList<Reviews>> GetReviews(int ProductId);
        Task<decimal> getProductRating(int ProductId);
        Task<int> getReviewed(string username, int productId);
        Task<int> getReviewsCount(int ProductId);
    }
}