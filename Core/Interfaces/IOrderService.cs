using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;

namespace Core.Interfaces
{
    public interface IOrderService
    {
        Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethod, string basketId, Address shippingAddress);
        Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail);
        Task<Order> GetOrderByIdAsync(int id, string buyerEmail);
        Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync();
        Task<DeliveryMethod> GetDeliveryMethodAsync(int id);
        Task<int> getOrdersCount();
        Task<IReadOnlyList<Order>> GetOrders(string orderStatus);
        Task AddDeliveryMethod(DeliveryMethod method);
        Task UpdateOrderStatus(int id, Order order);
        Task UpdateDeliveryMethod(int id, DeliveryMethod deliveryMethod);
        Task RemoveDeliveryMethod(int id);
    }
}