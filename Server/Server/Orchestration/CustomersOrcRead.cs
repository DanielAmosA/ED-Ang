using Server.BL;
using Server.Domain.Entities;
using Server.Domain.GeneralStructure;
using Server.Domain.GeneralStructureInterfaces;
using Server.OrchestrationInterfaces;

namespace Server.Orchestration
{
    /// <summary>
    /// The class responsible for Managing Read requests 
    /// From the CustomersController (API) to the CustomersBL (Business Logic).
    /// With using the Factory Design Pattern
    /// </summary>
    public class CustomersOrcRead : ICustomersOrcRead
    {
        private readonly IFactory<CustomersBL> customersBLFactory;
        public CustomersOrcRead(IFactory<CustomersBL> customersBLFactory)
        {
            // Inject the registerUserBLFactory,
            // which is a factorization that will provide CustomerTypesBL objects.
            // This factory creates the Business Logic(BL) objects.
            this.customersBLFactory = customersBLFactory;
        }

        public async Task<PageApiActionResponse<Customers>> GetAllByPageAndSize(int page, int pageSize)
        {
            using (CustomersBL customersBL = customersBLFactory.Create())
            {
                return await customersBL.GetAllByPageAndSize(page, pageSize);
            }
        }

        public async Task<object> GetCustomerMainData(int id){
            using (CustomersBL customersBL = customersBLFactory.Create())
            {
                return await customersBL.GetCustomerMainData(id);
            }
        }
    }
}
