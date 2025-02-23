using Server.BLInterfaces;
using Server.DALInterfaces;

namespace Server.BL
{
    /// <summary>
    /// The class responsible for Customer Types Business Logic 
    /// Before being sent to the ContactsDAL (Data Access Layer).
    /// </summary>
    public class ContactsBL : IAddressTypesBL
    {
        private readonly IContactsDAL contactsDAL;

        public ContactsBL(IContactsDAL contactsDAL)
        {
            // Calling and executing services of the DAL (Data Access Layer).
            this.contactsDAL = contactsDAL;
        }

        public void Dispose()
        {
            // Makes sure that there is no need to call the class's finalizer,
            // so that the GC will not consume any more resource time on its operation.
            GC.SuppressFinalize(this);
        }
    }
}
