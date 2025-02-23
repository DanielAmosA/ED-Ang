using Server.BL;
using Server.Domain.GeneralStructureInterfaces;
using Server.OrchestrationInterfaces;

namespace Server.Orchestration
{
    /// <summary>
    /// The class responsible for Managing Read requests 
    /// From the AddressesController (API) to the AddressesBL (Business Logic).
    /// With using the Factory Design Pattern
    /// </summary>
    public class AddressesOrcRead : IAddressesOrcRead
    {
        private readonly IFactory<AddressesBL> addressesBLFactory;
        public AddressesOrcRead(IFactory<AddressesBL> addressesBLFactory)
        {
            // Inject the registerUserBLFactory,
            // which is a factorization that will provide CustomerTypesBL objects.
            // This factory creates the Business Logic(BL) objects.
            this.addressesBLFactory = addressesBLFactory;
        }

    }
}
