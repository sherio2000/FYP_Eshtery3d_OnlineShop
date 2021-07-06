using Core.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Core.Specifications;


namespace Infrastructure.Data
{
    public class OrderRepository : IOrder
    {
        private readonly StoreContext context;
        private readonly IGenericRepository<Order> orderRepo;
        private readonly IUnitOfWork unitOfWork;
        public OrderRepository(StoreContext context, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.context = context;
        }


        public async Task<IReadOnlyList<Order>> GetPendingOrders()
        {
            return await this.context.Orders.FromSqlRaw("SELECT * FROM Orders WHERE Status = 'Pending'")
            .Include(o => o.OrderItems)
            .Include(o => o.DeliveryMethod)
            .ToListAsync();
        }

        public async Task<IReadOnlyList<Order>> GetConfirmedOrders()
        {
            return await this.context.Orders.FromSqlRaw("SELECT * FROM Orders WHERE Status = 'OrderConfirmed'")
            .Include(o => o.OrderItems)
            .Include(o => o.DeliveryMethod)
            .ToListAsync();
        }

        public async Task<IReadOnlyList<Order>> GetPreparingOrders()
        {
            return await this.context.Orders.FromSqlRaw("SELECT * FROM Orders WHERE Status = 'Preparing'")
            .Include(o => o.OrderItems)
            .Include(o => o.DeliveryMethod)
            .ToListAsync();
        }

        public async Task<IReadOnlyList<Order>> GetOutForDeliveryOrders()
        {
            return await this.context.Orders.FromSqlRaw("SELECT * FROM Orders WHERE Status = 'OutForDelivery'")
            .Include(o => o.OrderItems)
            .Include(o => o.DeliveryMethod)
            .ToListAsync();
        }

        public async Task<IReadOnlyList<Order>> GetRecievedOrders()
        {
            return await this.context.Orders.FromSqlRaw("SELECT * FROM Orders WHERE Status = 'Recieved'")
            .Include(o => o.OrderItems)
            .Include(o => o.DeliveryMethod)
            .ToListAsync();
        }

            public async Task<IReadOnlyList<Order>> GetCancelledOrders()
            {
            return await this.context.Orders.FromSqlRaw("SELECT * FROM Orders WHERE Status = 'Cancelled'")
            .Include(o => o.OrderItems)
            .Include(o => o.DeliveryMethod)
            .ToListAsync();
        }

        public async Task<IReadOnlyList<Order>> GetAllOrders()
        {
            return await this.context.Orders
            .Include(o => o.OrderItems)
            .Include(o => o.DeliveryMethod)
            .ToListAsync();
        }

        public async Task<Order> GetOrderDetailed(int id)
        {
           return await this.context.Orders
           .Include(o => o.OrderItems)
           .Include(o => o.DeliveryMethod).FirstAsync(x => x.Id == id);
        }
    }
}