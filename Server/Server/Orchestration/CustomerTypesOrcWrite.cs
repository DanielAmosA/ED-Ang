using Server.BL;
using Server.BL.Factory;
using Server.Domain.GeneralStructureInterfaces;
using Server.OrchestrationInterfaces;

namespace Server.Orchestration
{
    /// <summary>
    /// The class responsible for Managing Write requests 
    /// From the CustomerTypesController (API) to the CustomerTypesBL (Business Logic).
    /// With using the Factory Design Pattern
    /// </summary>
    public class CustomerTypesOrcWrite : ICustomerTypesOrcWrite
    {
        private readonly IFactory<CustomerTypesBL> customerTypesBLFactory;
        public CustomerTypesOrcWrite(IFactory<CustomerTypesBL> customerTypesBLFactory)
        {
            // Inject the registerUserBLFactory,
            // which is a factorization that will provide CustomerTypesBL objects.
            // This factory creates the Business Logic(BL) objects.
            this.customerTypesBLFactory = customerTypesBLFactory;
        }

    }
}
