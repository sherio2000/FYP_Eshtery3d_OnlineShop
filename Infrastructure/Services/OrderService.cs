using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;


namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IGenericRepository<Order> orderRepo;
        private readonly IGenericRepository<Product> produtRepo;
        private readonly IBasketRepository basketRepo;
        private readonly IGenericRepository<DeliveryMethod> dmRepo;
        private readonly IUnitOfWork unitOfWork;
        public OrderService(IBasketRepository basketRepo, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;


            this.basketRepo = basketRepo;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            //get basket from the repo 
            var basket = await this.basketRepo.GetBasketAsync(basketId);
            //get items from product repo
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = await this.unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }
            //get delivery method
            var deliveryMethod = await this.unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);
            //calc subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity);
            //create order
            var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal);
            this.unitOfWork.Repository<Order>().Add(order);
            //save to db
            var result = await this.unitOfWork.Complete();
            if (result <= 0) return null;
            //delete basket
            await this.basketRepo.DeleteBasketAync(basketId);
            //return order
            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await unitOfWork.Repository<DeliveryMethod>().ListAllSync();
        }

        public async Task<DeliveryMethod> GetDeliveryMethodAsync(int id)
        {
            return await unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(id);
        }        

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(id, buyerEmail);
            return await unitOfWork.Repository<Order>().GetEntityWithSpec(spec); 
        }



        public async Task<int> getOrdersCount()
        { 
            var spec = new IncludeSpecificaitons();  
            var count = await this.unitOfWork.Repository<Order>().CountAsync(spec);
            return count;
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);
            return await unitOfWork.Repository<Order>().ListAsync(spec);
        }



        public async Task UpdateOrderStatus(int id, Order order)
        {
            var spec = new IncludeSpecificaitons(id);
            var corder = await unitOfWork.Repository<Order>().GetEntityWithSpec(spec); 
            if(order.Status.ToString() == "Pending")
            {
                corder.Status = OrderStatus.Pending;
            }
            else if(order.Status.ToString() == "Confirmed") {
                corder.Status = OrderStatus.OrderConfirmed;
            }
            else if(order.Status.ToString() == "Preparing") {
                corder.Status = OrderStatus.Preparing;
            }
            else if(order.Status.ToString() == "OutForDelivery") {
                corder.Status = OrderStatus.OutForDelivery;
            }
            else if(order.Status.ToString() == "Recieved") {
                corder.Status = OrderStatus.Recieved;
            }
            else if(order.Status.ToString() == "Cancelled") {
                corder.Status = OrderStatus.Cancelled;
            }
            await this.unitOfWork.Complete();
        }

        public async Task UpdateDeliveryMethod(int id, DeliveryMethod deliveryMethod)
        {
            DeliveryMethod cMethod = await unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(id);
            if(cMethod.ShortName != deliveryMethod.ShortName && deliveryMethod.ShortName != ""){
                cMethod.ShortName = deliveryMethod.ShortName;
            }
            if(cMethod.DeliveryTime != deliveryMethod.DeliveryTime && deliveryMethod.DeliveryTime != ""){
                cMethod.DeliveryTime = deliveryMethod.DeliveryTime;
            }
            if(cMethod.Description != deliveryMethod.Description && deliveryMethod.Description != ""){
                cMethod.Description = deliveryMethod.Description;
            }
            if(cMethod.Price != deliveryMethod.Price && deliveryMethod.Price != 0){
                cMethod.Price = deliveryMethod.Price;
            }
            await this.unitOfWork.Complete();
        }

        public async Task AddDeliveryMethod(DeliveryMethod method)
        {
            DeliveryMethod newMethod = new DeliveryMethod {
                ShortName = method.ShortName,
                DeliveryTime = method.DeliveryTime,
                Description = method.Description,
                Price = method.Price
            };
            unitOfWork.Repository<DeliveryMethod>().Add(newMethod);
            await unitOfWork.Complete();
        }

        public async Task RemoveDeliveryMethod(int id)
        {
            var method = await unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(id);
            unitOfWork.Repository<DeliveryMethod>().Delete(method);
            await unitOfWork.Complete();
        }

        public Task<IReadOnlyList<Order>> GetOrders(string orderStatus)
        {
            throw new System.NotImplementedException();
        }
    }
}