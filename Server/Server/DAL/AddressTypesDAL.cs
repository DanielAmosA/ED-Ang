using Microsoft.Extensions.Options;
using Server.DALInterfaces;
using Server.Domain.Entities;
using Server.Domain.GeneralStructure;
using Server.Infrastructure.Data;

namespace Server.DAL
{
    /// <summary>
    /// The class responsible for Calling the procedures and their data 
    /// According to the Address Types area.
    /// </summary>
    public class AddressTypesDAL : BaseDal<AddressTypes>, IAddressTypesDAL
    {
        public AddressTypesDAL(AppDbContext dbContext) : base(dbContext)
        {
        }
    }
}
