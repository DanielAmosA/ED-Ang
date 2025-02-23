using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Contracts;
using Server.Domain.Entities;
using Server.Infrastructure.Data;
using Server.OrchestrationInterfaces;

namespace Server.Controllers
{
    /// <summary>
    /// The Controller responsible for API actions for an AddressTypes
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class AddressTypesController : ControllerBase, IAddressTypesContracts
    {

        private readonly IAddressTypesOrcRead addressTypesOrcRead;
        private readonly IAddressTypesOrcWrite addressTypesOrcWrite;

        private readonly AppDbContext dbContext;

        public AddressTypesController(AppDbContext context,
            IAddressTypesOrcRead addressTypesOrcRead,
            IAddressTypesOrcWrite addressTypesOrcWrite)
        {
            dbContext = context;
            this.addressTypesOrcRead = addressTypesOrcRead;
            this.addressTypesOrcWrite = addressTypesOrcWrite;

        }

        [HttpGet("GetAllAddressTypes")]
        public async Task<ActionResult<List<AddressTypes>>> GetAllAddressTypes()
        {

            try
            {
                List<AddressTypes> addressTypes = await addressTypesOrcRead.GetAll();
                return Ok(addressTypes);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Error retrieving data => {ex.Message}" });
            }

        }
    }
}
