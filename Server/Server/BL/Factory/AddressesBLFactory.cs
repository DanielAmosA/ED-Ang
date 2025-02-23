using Server.DALInterfaces;
using Server.Domain.GeneralStructureInterfaces;

namespace Server.BL.Factory
{
    /// <summary>
    /// The class responsible for Implementation of the Factory Design Pattern for the AddressesBL (Business Logic) 
    /// where the factory is responsible for creating an object of type AddressesBL.
    /// </summary>
    public class AddressesBLFactory : IFactory<AddressesBL>
    {
        private readonly IAddressesDAL addressesDAL;

        // Gets the required dependencies through the constructor.
        public AddressesBLFactory(IAddressesDAL addressesDAL)
        {
            this.addressesDAL = addressesDAL;
        }

        // Constructs the object and returns it, with all injected dependencies.
        public AddressesBL Create()
        {
            return new AddressesBL(addressesDAL);

        }
    }
}
