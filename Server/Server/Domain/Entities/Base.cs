using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Server.Domain.EntitiesInterfaces;

namespace Server.Domain.Entities
{
    public abstract class Base : IBase
    {
        public int Id { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime Created { get; set; }
    }
}
