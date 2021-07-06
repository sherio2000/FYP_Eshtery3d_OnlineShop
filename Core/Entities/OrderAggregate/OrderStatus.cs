using System.Runtime.Serialization;

namespace Core.Entities.OrderAggregate
{
    public enum OrderStatus
    {
        [EnumMember(Value = "Pending")]
        Pending,
        [EnumMember(Value = "Order Confirmed")]
        OrderConfirmed,
        [EnumMember(Value = "Preparing Order")]
        Preparing,
        [EnumMember(Value = "Out For Delivery")]
        OutForDelivery,
        [EnumMember(Value = "Order Received ")]
        Recieved,

        [EnumMember(Value = "Order Cancelled ")]
        Cancelled
    }
}