using Server.Domain.EntitiesInterfaces;
using System.Text.Json.Serialization;

namespace Server.Domain.Entities
{
    public class CustomerTypes : ICustomerTypes
    {
        public int ID { get; set; }
        public string CustomerTypeName { get; set; }

        [JsonIgnore]
        // One-to-one relationship with a Customers
        public virtual Customers Customer { get; set; }
        
    }
}
