using Server.DALInterfaces;
using Server.Domain.GeneralStructureInterfaces;

namespace Server.BL.Factory
{
    /// <summary>
    /// The class responsible for Implementation of the Factory Design Pattern for the CustomersBL (Business Logic) 
    /// where the factory is responsible for creating an object of type CustomersBL.
    /// </summary>
    public class CustomersBLFactory : IFactory<CustomersBL>
    {
        private readonly ICustomersDAL customersDAL;

        // Gets the required dependencies through the constructor.
        public CustomersBLFactory(ICustomersDAL customersDAL)
        {
            this.customersDAL = customersDAL;
        }

        // Constructs the object and returns it, with all injected dependencies.
        public CustomersBL Create()
        {
            return new CustomersBL(customersDAL);
        }
    }
}
