using Server.BLInterfaces;
using Server.DAL;
using Server.DALInterfaces;
using Server.Domain.Entities;
using Server.Domain.EntitiesInterfaces;

namespace Server.BL
{
    /// <summary>
    /// The class responsible for Customer Types Business Logic 
    /// Before being sent to the CustomerTypesDAL (Data Access Layer).
    /// </summary>
    public class CustomerTypesBL : ICustomerTypesBL
    {
        private readonly ICustomerTypesDAL customerTypesDAL;

        public CustomerTypesBL(ICustomerTypesDAL customerTypesDAL)
        {
            // Calling and executing services of the DAL (Data Access Layer).
            this.customerTypesDAL = customerTypesDAL;
        }

        public async Task<List<CustomerTypes>> GetAll()
        {
            return await customerTypesDAL.GetAll();
        }

        public void Dispose()
        {
            // Makes sure that there is no need to call the class's finalizer,
            // so that the GC will not consume any more resource time on its operation.
            GC.SuppressFinalize(this);
        }
    }
}
