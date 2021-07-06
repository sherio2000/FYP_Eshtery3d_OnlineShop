
using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class IncludeSpecificaitons : BaseSpecification<Order>
    {
        public IncludeSpecificaitons()
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
            AddOrderByDescending(o => o.OrderDate);
        }

        public IncludeSpecificaitons(int id) : base(o => o.Id == id)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
            AddOrderByDescending(o => o.OrderDate);
        }
    }
}