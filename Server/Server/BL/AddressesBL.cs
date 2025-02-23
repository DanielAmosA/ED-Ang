using Server.BLInterfaces;
using Server.DALInterfaces;
using Server.Domain.Entities;

namespace Server.BL
{
    /// <summary>
    /// The class responsible for Customer Types Business Logic 
    /// Before being sent to the AddressesDAL (Data Access Layer).
    /// </summary>
    public class AddressesBL : IAddressesBL
    {
        private readonly IAddressesDAL addressesDAL;

        public AddressesBL(IAddressesDAL addressesDAL)
        {
            // Calling and executing services of the DAL (Data Access Layer).
            this.addressesDAL = addressesDAL;
        }

        public void Dispose()
        {
            // Makes sure that there is no need to call the class's finalizer,
            // so that the GC will not consume any more resource time on its operation.
            GC.SuppressFinalize(this);
        }
    }
}
