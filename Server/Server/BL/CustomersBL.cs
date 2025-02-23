using Server.BLInterfaces;
using Server.DAL;
using Server.DALInterfaces;
using Server.Domain.Entities;
using Server.Domain.GeneralStructure;

namespace Server.BL
{
    /// <summary>
    /// The class responsible for Customer Types Business Logic 
    /// Before being sent to the CustomersDAL (Data Access Layer).
    /// </summary>
    public class CustomersBL : ICustomersBL
    {
        private readonly ICustomersDAL customersDAL;

        public CustomersBL(ICustomersDAL customersDAL)
        {
            // Calling and executing services of the DAL (Data Access Layer).
            this.customersDAL = customersDAL;
        }

        public async Task<PageApiActionResponse<Customers>> GetAllByPageAndSize(int page, int pageSize)
        {
            return await customersDAL.GetAllByPageAndSize(page,pageSize);
        }

        public async Task<object> GetCustomerMainData(int id)
        {
            return await customersDAL.GetCustomerMainData(id);
        }

        public async Task CreateNewCustomer(Customers newCustomer)
        {
            await customersDAL.CreateNewCustomer(newCustomer);
        }

        public async Task UpdateCustomer(int id, Customers updateCustomer)
        {
            await customersDAL.UpdateCustomer(id, updateCustomer);
        }

        public async Task DeleteCustomer(int id)
        {
            await customersDAL.DeleteCustomer(id);
        }

        public void Dispose()
        {
            // Makes sure that there is no need to call the class's finalizer,
            // so that the GC will not consume any more resource time on its operation.
            GC.SuppressFinalize(this);
        }
    }
}
