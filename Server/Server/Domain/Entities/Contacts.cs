using Server.Domain.EntitiesInterfaces;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Server.Domain.Entities
{
    public class Contacts : Base, IContacts
    {
        public string FullName { get; set; }
        public string? OfficeNumber { get; set; }
        public string? Email { get; set; }
        public int CustomerId { get; set; }

        [JsonIgnore]
        public virtual Customers? Customer { get; set; }

        public Contacts()
        {
            FullName = string.Empty;
            Customer = new Customers();
        }
    }
}
