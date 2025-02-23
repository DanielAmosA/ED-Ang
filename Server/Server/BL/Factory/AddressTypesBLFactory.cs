using Server.DALInterfaces;
using Server.Domain.Entities;
using Server.Domain.GeneralStructureInterfaces;

namespace Server.BL.Factory
{
    /// <summary>
    /// The class responsible for Implementation of the Factory Design Pattern for the AddressTypesBL (Business Logic) 
    /// where the factory is responsible for creating an object of type AddressTypesBL.
    /// </summary>
    public class AddressTypesBLFactory : IFactory<AddressTypesBL>
    {
        private readonly IAddressTypesDAL addressTypesDAL;

        // Gets the required dependencies through the constructor.
        public AddressTypesBLFactory(IAddressTypesDAL addressTypesDAL)
        {
            this.addressTypesDAL = addressTypesDAL;
        }

        // Constructs the object and returns it, with all injected dependencies.
        public AddressTypesBL Create()
        {
            return new AddressTypesBL(addressTypesDAL);
        }
    }
}
