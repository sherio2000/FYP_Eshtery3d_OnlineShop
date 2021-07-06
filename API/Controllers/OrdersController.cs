using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OrdersController : BaseApiController
    {
        private readonly IOrderService orderService;
        private readonly IMapper mapper;
        private readonly IOrder orderRepo;
        public OrdersController(IOrderService orderService, IMapper mapper, IOrder orderRepo)
        {
            this.orderRepo = orderRepo;
            this.mapper = mapper;
            this.orderService = orderService;
        }
        [HttpPost]
        public async Task<ActionResult<Order>> createOrder(OrderDto orderDto)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var address = this.mapper.Map<AddressDto, Address>(orderDto.ShipToAddress);
            var order = await this.orderService.CreateOrderAsync(email, orderDto.DeliveryMethodId, orderDto.BasketId, address);
            if (order == null)
            {
                return BadRequest(new ApiResponse(400, "Problem Creating Order"));
            }
            return Ok(order);
        }

        [HttpPost("deliveryMethod")]
        [AllowAnonymous]
        public async Task CreateDeliveryMethod(DeliveryMethodDto method)
        {
            var updatedMethod = this.mapper.Map<DeliveryMethodDto, DeliveryMethod>(method);
            await this.orderService.AddDeliveryMethod(updatedMethod);

        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetOrdersForUser()
        {
            var email = User.RetrieveEmailFromPrincipal();
            var orders = await this.orderService.GetOrdersForUserAsync(email);
            return Ok(this.mapper.Map<IReadOnlyList<OrderToReturnDto>>(orders));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id)
        {
            var email = User.RetrieveEmailFromPrincipal();
            var order = await this.orderService.GetOrderByIdAsync(id, email);
            if (order == null) return NotFound(new ApiResponse(404));
            return this.mapper.Map<OrderToReturnDto>(order);
        }

        [HttpGet("orderDetail/{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderById(int id)
        {
            var order = await this.orderRepo.GetOrderDetailed(id);
            if (order == null) return NotFound(new ApiResponse(404));
            return this.mapper.Map<OrderToReturnDto>(order);
        }
        [HttpGet("deliveryMethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await this.orderService.GetDeliveryMethodsAsync());
        }

        [HttpGet("deliveryMethod/{id}")]
        public async Task<ActionResult<DeliveryMethod>> GetDeliveryMethod(int id)
        {
            return Ok(await this.orderService.GetDeliveryMethodAsync(id));
        }

        [HttpGet("pendingOrders")]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetPendingOrders()
        {
            var orders = await this.orderRepo.GetPendingOrders();
            return Ok(this.mapper.Map<IReadOnlyList<OrderToReturnDto>>(orders));
        }

        [HttpGet("confirmedOrders")]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetConfirmedOrders()
        {
            var orders = await this.orderRepo.GetConfirmedOrders();
            return Ok(this.mapper.Map<IReadOnlyList<OrderToReturnDto>>(orders));
        }

        [HttpGet("preparingOrders")]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetPreparingOrders()
        {
            var orders = await this.orderRepo.GetPreparingOrders();
            return Ok(this.mapper.Map<IReadOnlyList<OrderToReturnDto>>(orders));
        }

        
        [HttpGet("outForDeliveryOrders")]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetOutForDeliveryOrders()
        {
            var orders = await this.orderRepo.GetOutForDeliveryOrders();
            return Ok(this.mapper.Map<IReadOnlyList<OrderToReturnDto>>(orders));
        }

        [HttpGet("receivedOrders")]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetRecievedOrders()
        {
            var orders = await this.orderRepo.GetRecievedOrders();
            return Ok(this.mapper.Map<IReadOnlyList<OrderToReturnDto>>(orders));
        }

        [HttpGet("cancelledOrders")]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetCancelledOrders()
        {
            var orders = await this.orderRepo.GetCancelledOrders();
            return Ok(this.mapper.Map<IReadOnlyList<OrderToReturnDto>>(orders));
        }

        [HttpGet("allOrders")]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetAllOrders()
        {
            var orders = await this.orderRepo.GetAllOrders();
            return Ok(this.mapper.Map<IReadOnlyList<OrderToReturnDto>>(orders));
        }

        [HttpGet("ordersCount")]
        [AllowAnonymous]
        public async Task<int> GetOrdersCount()
        {
            return await this.orderService.getOrdersCount();
        }



        [HttpPut("status")]
        [AllowAnonymous]
        public async Task UpdateOrderStatus(OrderToReturnDto order)
        {
            var UpdateStatus = this.mapper.Map<OrderToReturnDto, Order>(order);
            await this.orderService.UpdateOrderStatus(UpdateStatus.Id, UpdateStatus);
        }

        [HttpPut("deliveryMethod")]
        [AllowAnonymous]
        public async Task UpdateDeliveryMethod(DeliveryMethod method)
        {
            await this.orderService.UpdateDeliveryMethod(method.Id, method);
        }

        [HttpDelete("deliveryMethod")]
        [AllowAnonymous]
        public async Task DeleteDeliveryMethod(int id)
        {
            await this.orderService.RemoveDeliveryMethod(id);
        }
    }
}