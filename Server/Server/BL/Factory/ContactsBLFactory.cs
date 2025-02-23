using Server.DALInterfaces;
using Server.Domain.GeneralStructureInterfaces;

namespace Server.BL.Factory
{
    /// <summary>
    /// The class responsible for Implementation of the Factory Design Pattern for the ContactsBL (Business Logic) 
    /// where the factory is responsible for creating an object of type ContactsBL.
    /// </summary>
    public class ContactsBLFactory : IFactory<ContactsBL>
    {
        private readonly IContactsDAL contactsDAL;

        // Gets the required dependencies through the constructor.
        public ContactsBLFactory(IContactsDAL contactsDAL)
        {
            this.contactsDAL = contactsDAL;
        }

        // Constructs the object and returns it, with all injected dependencies.
        public ContactsBL Create()
        {
            return new ContactsBL(contactsDAL);
        }
    }
}
