using Server.BL;
using Server.BL.Factory;
using Server.Domain.Entities;
using Server.Domain.EntitiesInterfaces;
using Server.Domain.GeneralStructureInterfaces;
using Server.OrchestrationInterfaces;

namespace Server.Orchestration
{
    /// <summary>
    /// The class responsible for Managing Read requests 
    /// From the CustomerTypesController (API) to the CustomerTypesBL (Business Logic).
    /// With using the Factory Design Pattern
    /// </summary>
    public class CustomerTypesOrcRead : ICustomerTypesOrcRead
    {
        private readonly IFactory<CustomerTypesBL> customerTypesBLFactory;
        public CustomerTypesOrcRead(IFactory<CustomerTypesBL> customerTypesBLFactory)
        {
            // Inject the registerUserBLFactory,
            // which is a factorization that will provide CustomerTypesBL objects.
            // This factory creates the Business Logic(BL) objects.
            this.customerTypesBLFactory = customerTypesBLFactory;
        }

        public async Task<List<CustomerTypes>> GetAll()
        {
            using (CustomerTypesBL customerTypesBL = customerTypesBLFactory.Create())
            {
                return await customerTypesBL.GetAll();
            }
        }
    }
}
