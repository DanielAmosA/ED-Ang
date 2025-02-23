using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Contracts;
using Server.Infrastructure.Data;
using Server.OrchestrationInterfaces;

namespace Server.Controllers
{
    /// <summary>
    /// The Controller responsible for API actions for a Contacts
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase, IContactsContracts
    {
        private readonly IContactsOrcRead contactsOrcRead;
        private readonly IContactsOrcWrite contactsOrcWrite;

        private readonly AppDbContext dbContext;

        public ContactsController(AppDbContext context,
            IContactsOrcRead contactsOrcRead,
            IContactsOrcWrite contactsOrcWrite)
        {
            dbContext = context;
            this.contactsOrcRead = contactsOrcRead;
            this.contactsOrcWrite = contactsOrcWrite;

        }
    }
}
