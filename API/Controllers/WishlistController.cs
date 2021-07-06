using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class WishlistController : BaseApiController
    {
        private readonly IWishlistRepository wishlistRpository;
        public WishlistController(IWishlistRepository wishlistRpository)
        {
            this.wishlistRpository = wishlistRpository;

        }

        [HttpGet]
        public async Task<ActionResult<CustomerWishlist>> GetWishlistById(string id)
        {
            var wishlist = await this.wishlistRpository.GetWishlistAsync(id);
            return Ok(wishlist ?? new CustomerWishlist(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerWishlist>> UpdateWishlist(CustomerWishlist wishlist)
        {
            var updatedWishlist = await this.wishlistRpository.UpdateWishlistAsync(wishlist);
            return Ok(updatedWishlist);
        }

        [HttpDelete]
        public async Task DeleteWishlistAsync(string id) 
        {
            await this.wishlistRpository.DeleteWishlistAsync(id);
        }
    }
}