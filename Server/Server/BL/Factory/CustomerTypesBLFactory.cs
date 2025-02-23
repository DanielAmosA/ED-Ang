using Server.BLInterfaces;
using Server.DALInterfaces;
using Server.Domain.GeneralStructureInterfaces;

namespace Server.BL.Factory
{
    /// <summary>
    /// The class responsible for Implementation of the Factory Design Pattern for the CustomerTypesBL (Business Logic) 
    /// where the factory is responsible for creating an object of type CustomerTypesBL.
    /// </summary>
    public class CustomerTypesBLFactory : IFactory<CustomerTypesBL>
    {
        private readonly ICustomerTypesDAL customerTypesDAL;

        // Gets the required dependencies through the constructor.
        public CustomerTypesBLFactory(ICustomerTypesDAL customerTypesDAL)
        {
            this.customerTypesDAL = customerTypesDAL;
        }

        // Constructs the object and returns it, with all injected dependencies.
        public CustomerTypesBL Create()
        {
            return new CustomerTypesBL(customerTypesDAL);
        }
    }
}
