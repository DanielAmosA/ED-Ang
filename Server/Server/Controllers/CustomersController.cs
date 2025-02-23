using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Server.Contracts;
using Server.Domain.Entities;
using Server.Domain.EntitiesInterfaces;
using Server.Domain.GeneralStructure;
using Server.Infrastructure.Data;
using Server.Infrastructure.ServiceInterfaces;
using Server.Infrastructure.Validation;
using Server.OrchestrationInterfaces;
using System.Net;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Text;

namespace Server.Controllers
{
    /// <summary>
    /// The Controller responsible for API actions for a Customers
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase, ICustomersContracts
    {

        private readonly AppDbContext dbContext;

        private readonly ICustomersOrcRead customersOrcRead;
        private readonly ICustomersOrcWrite customersOrcWrite;
        private readonly IValidatorService<Customers> validatorCustomers;
        private readonly IHelperService helperService;

        public CustomersController(AppDbContext context,
            ICustomersOrcRead customersOrcRead,
            ICustomersOrcWrite customersOrcWrite,
            IValidatorService<Customers> validatorCustomers,
            IHelperService helperService)
        {
            dbContext = context;
            this.customersOrcRead = customersOrcRead;
            this.customersOrcWrite = customersOrcWrite;
            this.validatorCustomers = validatorCustomers;
            this.helperService = helperService;
        }


        [HttpGet("GetCustomers")]
        public async Task<ActionResult<PageApiActionResponse<Customers>>> GetCustomers(
                                                                                        [FromQuery] int page = 1,
                                                                                        [FromQuery] int pageSize = 10)
        {

            try
            {
                PageApiActionResponse<Customers> result = await customersOrcRead.GetAllByPageAndSize(page, pageSize);
                result.Data.Sort((x, y) => x.Name!.CompareTo(y.Name));
                return Ok(result);
            }
                catch (Exception ex)
                {
                return BadRequest(new { message = $"Error retrieving data  =>  {ex.Message}" });
                }

        }

        [HttpGet("GetCustomer")]
        public async Task<ActionResult<IQueryable<Customers>>> GetCustomer([FromQuery] int id)
        {
            try
            {
                object result = await customersOrcRead.GetCustomerMainData(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Error retrieving data  =>  {ex.Message}" });
            }
        }


        [HttpDelete("DeleteCustomer")]
        public async Task<ActionResult> DeleteCustomer([FromQuery] int id)
        {
            try
            {
                await customersOrcWrite.DeleteCustomer(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Error retrieving data  =>  {ex.Message}" });
            }
        }


        [HttpPost("CreateNewCustomer")]
        public async Task<ActionResult> CreateNewCustomer([FromBody] Customers newCustomer)
        {

            ValidationResultStruct validationResultStruct = validatorCustomers.Validate(newCustomer);
            if (!validationResultStruct.isValid)
            {           
                return BadRequest(new { message = helperService.GenerateErrorString(validationResultStruct.errors!) });
            }

            try
            {
                await customersOrcWrite.CreateNewCustomer(newCustomer);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Error retrieving data  =>  {ex.Message}" });
            }
        }


        [HttpPut("UpdateCustomer/{id}")]
        public async Task<ActionResult> UpdateCustomer( int id, [FromBody] Customers updateCustomer)
        {
            ValidationResultStruct validationResultStruct = validatorCustomers.Validate(updateCustomer);
            if (!validationResultStruct.isValid)
            {
                return BadRequest(new { message = helperService.GenerateErrorString(validationResultStruct.errors!) });
            }

            try
            {
                await customersOrcWrite.UpdateCustomer(id, updateCustomer);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Error retrieving data  =>  {ex.Message}" });
            }
        }

    }
}
