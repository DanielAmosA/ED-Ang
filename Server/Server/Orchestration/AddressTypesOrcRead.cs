using Server.BL;
using Server.Domain.Entities;
using Server.Domain.GeneralStructureInterfaces;
using Server.OrchestrationInterfaces;

namespace Server.Orchestration
{
    /// <summary>
    /// The class responsible for Managing Read requests 
    /// From the AddressTypesController (API) to the AddressTypesBL (Business Logic).
    /// With using the Factory Design Pattern
    /// </summary>
    public class AddressTypesOrcRead : IAddressTypesOrcRead
    {
        private readonly IFactory<AddressTypesBL> addressTypesBLFactory;
        public AddressTypesOrcRead(IFactory<AddressTypesBL> addressTypesBLFactory)
        {
            // Inject the registerUserBLFactory,
            // which is a factorization that will provide CustomerTypesBL objects.
            // This factory creates the Business Logic(BL) objects.
            this.addressTypesBLFactory = addressTypesBLFactory;
        }

        public async Task<List<AddressTypes>> GetAll()
        {
            using (AddressTypesBL addressTypesBL = addressTypesBLFactory.Create())
            {
                return await addressTypesBL.GetAll();
            }
        }
    }
}
