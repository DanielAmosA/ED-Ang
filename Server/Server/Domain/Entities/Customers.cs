using Server.Domain.EntitiesInterfaces;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net;
using System.Text.Json.Serialization;

namespace Server.Domain.Entities
{
    public class Customers : Base, ICustomers
    {
        public string?  Name { get; set; }
        public string? CustomerNumber { get; set; }

        // One-to-many relationship with Addresses
        public virtual ICollection<Addresses>? Addresses { get; set; }

        // One-to-many relationship with Contacts
        public virtual ICollection<Contacts>? Contacts { get; set; }

        public int CustomerTypeID { get; set; }

        [JsonIgnore]
        public virtual CustomerTypes? CustomerType { get; set; }
    }

}
