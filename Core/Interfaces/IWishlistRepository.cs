using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IWishlistRepository
    {
         Task<CustomerWishlist> GetWishlistAsync(string basketId);
         Task<CustomerWishlist> UpdateWishlistAsync(CustomerWishlist wishlist);
         Task<bool> DeleteWishlistAsync(string wishlistId);
    }
}