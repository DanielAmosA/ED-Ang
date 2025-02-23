using Server.BLInterfaces;
using Server.DALInterfaces;
using Server.Domain.Entities;
using Server.Domain.EntitiesInterfaces;

namespace Server.BL
{
    /// <summary>
    /// The class responsible for Customer Types Business Logic 
    /// Before being sent to the AddressTypesDAL (Data Access Layer).
    /// </summary>
    public class AddressTypesBL : IAddressTypesBL
    {
        private readonly IAddressTypesDAL addressTypesDAL;

        public AddressTypesBL(IAddressTypesDAL addressTypesDAL)
        {
            // Calling and executing services of the DAL (Data Access Layer).
            this.addressTypesDAL = addressTypesDAL;
        }

        public async Task<List<AddressTypes>> GetAll()
        {
            return await addressTypesDAL.GetAll();
        }

        public void Dispose()
        {
            // Makes sure that there is no need to call the class's finalizer,
            // so that the GC will not consume any more resource time on its operation.
            GC.SuppressFinalize(this);
        }
    }
}
