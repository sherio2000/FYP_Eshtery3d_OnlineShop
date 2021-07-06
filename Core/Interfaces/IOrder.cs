using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;
using System;
using Core.Entities;


namespace Core.Interfaces
{
    public interface IOrder
    {
        Task<IReadOnlyList<Order>> GetPendingOrders();
        Task<IReadOnlyList<Order>> GetConfirmedOrders();
        Task<IReadOnlyList<Order>> GetPreparingOrders();
        Task<IReadOnlyList<Order>> GetOutForDeliveryOrders();
        Task<IReadOnlyList<Order>> GetRecievedOrders();
        Task<IReadOnlyList<Order>> GetCancelledOrders();
        Task<IReadOnlyList<Order>> GetAllOrders();
        Task<Order> GetOrderDetailed(int id);

    }
}