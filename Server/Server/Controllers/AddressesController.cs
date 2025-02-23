using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Contracts;
using Server.Infrastructure.Data;
using Server.Infrastructure.ServiceInterfaces;
using Server.OrchestrationInterfaces;

namespace Server.Controllers
{
    /// <summary>
    /// The Controller responsible for API actions for an Addresses
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class AddressesController : ControllerBase, IAddressesContracts
    {

        private readonly IAddressesOrcRead addressesOrcRead;
        private readonly IAddressesOrcWrite addressesOrcWrite;

        public AddressesController(IAddressesOrcRead addressesOrcRead, IAddressesOrcWrite addressesOrcWrite)
        {
            this.addressesOrcRead = addressesOrcRead;
            this.addressesOrcWrite = addressesOrcWrite;
        }
    
    }
}
