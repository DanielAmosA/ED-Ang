using Server.Domain.EntitiesInterfaces;
using System.Text.Json.Serialization;

namespace Server.Domain.Entities
{
    public class AddressTypes : IAddressTypes
    {
        public int ID { get; set; }
        public string AddressTypeName { get; set; }

        // One-to-one relationship with a Addresses
        [JsonIgnore]
        public virtual Addresses Address { get; set; }

    }
}
