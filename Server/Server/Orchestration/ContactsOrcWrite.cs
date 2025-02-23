using Server.BL;
using Server.Domain.GeneralStructureInterfaces;
using Server.OrchestrationInterfaces;

namespace Server.Orchestration
{
    /// <summary>
    /// The class responsible for Managing Write requests 
    /// From the ContactsController (API) to the ContactsBL (Business Logic).
    /// With using the Factory Design Pattern
    /// </summary>
    public class ContactsOrcWrite : IContactsOrcWrite
    {
        private readonly IFactory<ContactsBL> contactsBLFactory;
        public ContactsOrcWrite(IFactory<ContactsBL> contactsBLFactory)
        {
            // Inject the registerUserBLFactory,
            // which is a factorization that will provide CustomerTypesBL objects.
            // This factory creates the Business Logic(BL) objects.
            this.contactsBLFactory = contactsBLFactory;
        }

    }
}
