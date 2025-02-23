using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Contracts;
using Server.Domain.Entities;
using Server.Infrastructure.Data;
using Server.Orchestration;
using Server.OrchestrationInterfaces;

namespace Server.Controllers
{
    /// <summary>
    /// The Controller responsible for API actions for a CustomerTypes
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerTypesController : ControllerBase, ICustomerTypesContracts
    {
        private readonly ICustomerTypesOrcRead customerTypesOrcRead;
        private readonly ICustomerTypesOrcWrite customerTypesrOrcWrite;

        public CustomerTypesController
            (
                ICustomerTypesOrcRead customerTypesOrcRead,
                ICustomerTypesOrcWrite customerTypesrOrcWrite)
            {
                this.customerTypesOrcRead = customerTypesOrcRead;
                this.customerTypesrOrcWrite = customerTypesrOrcWrite;
            }

        [HttpGet("GetAllCustomerTypes")]
        public async Task<ActionResult<List<CustomerTypes>>> GetAllCustomerTypes()
        {
            try
            {
                List<CustomerTypes> customerTypes = await customerTypesOrcRead.GetAll();
                return Ok(customerTypes);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Error retrieving data => {ex.Message}" });
            }

        }
    }
}
