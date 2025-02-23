using Server.BL;
using Server.Domain.Entities;
using Server.Domain.GeneralStructureInterfaces;
using Server.OrchestrationInterfaces;

namespace Server.Orchestration
{
    /// <summary>
    /// The class responsible for Managing Write requests 
    /// From the CustomersController (API) to the CustomersBL (Business Logic).
    /// With using the Factory Design Pattern
    /// </summary>
    public class CustomersOrcWrite : ICustomersOrcWrite
    {
        private readonly IFactory<CustomersBL> customersBLFactory;
        public CustomersOrcWrite(IFactory<CustomersBL> customersBLFactory)
        {
            // Inject the registerUserBLFactory,
            // which is a factorization that will provide CustomerTypesBL objects.
            // This factory creates the Business Logic(BL) objects.
            this.customersBLFactory = customersBLFactory;
        }

        public async Task CreateNewCustomer(Customers newCustomer)
        {
            using (CustomersBL customersBL = customersBLFactory.Create())
            {
                 await customersBL.CreateNewCustomer(newCustomer);
            }
        }

        public async Task UpdateCustomer(int id, Customers updateCustomer)
        {
            using (CustomersBL customersBL = customersBLFactory.Create())
            {
                 await customersBL.UpdateCustomer(id, updateCustomer);
            }
        }

        public async Task DeleteCustomer(int id)
        {
            using (CustomersBL customersBL = customersBLFactory.Create())
            {
                 await customersBL.DeleteCustomer(id);
            }
        }

    }
}
