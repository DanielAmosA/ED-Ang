using Server.Domain.EntitiesInterfaces;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Server.Domain.Entities
{
    public class Addresses : Base, IAddresses
    {
        public string City { get; set; }
        public string Street { get; set; }
        public int CustomerId { get; set; }       
        [JsonIgnore]
        public virtual Customers? Customer { get; set; }

        public int AddressTypesID { get; set; }
        public virtual AddressTypes? AddressType { get; set; }
    }
}
