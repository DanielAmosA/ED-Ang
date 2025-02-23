using Microsoft.AspNetCore.Mvc;
using Server.Domain.Entities;
using Server.Domain.GeneralStructure;

namespace Server.Contracts
{
    /// <summary>
    /// The interface responsible for Contract management for CustomersController
    /// </summary>
    public interface ICustomersContracts
    {
        Task<ActionResult> UpdateCustomer(int id, [FromBody] Customers updateCustomer);
        Task<ActionResult> CreateNewCustomer([FromBody] Customers newCustomer);
        Task<ActionResult> DeleteCustomer([FromQuery] int id);
        Task<ActionResult<IQueryable<Customers>>> GetCustomer([FromQuery] int id);
        Task<ActionResult<PageApiActionResponse<Customers>>> GetCustomers(
                                                                                        [FromQuery] int page = 1,
                                                                                        [FromQuery] int pageSize = 10);
    }
}
