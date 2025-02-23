using Server.BL;
using Server.Domain.GeneralStructureInterfaces;
using Server.OrchestrationInterfaces;

namespace Server.Orchestration
{
    /// <summary>
    /// The class responsible for Managing Write requests 
    /// From the AddressTypesController (API) to the AddressTypesBL (Business Logic).
    /// With using the Factory Design Pattern
    /// </summary>
    public class AddressTypesOrcWrite : IAddressTypesOrcWrite
    {
        private readonly IFactory<AddressTypesBL> addressTypesBLFactory;
        public AddressTypesOrcWrite(IFactory<AddressTypesBL> addressTypesBLFactory)
        {
            // Inject the registerUserBLFactory,
            // which is a factorization that will provide CustomerTypesBL objects.
            // This factory creates the Business Logic(BL) objects.
            this.addressTypesBLFactory = addressTypesBLFactory;
        }

    }
}
