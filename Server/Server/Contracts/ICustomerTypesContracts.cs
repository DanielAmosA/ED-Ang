using Microsoft.AspNetCore.Mvc;
using Server.Domain.Entities;

namespace Server.Contracts
{
    /// <summary>
    /// The interface responsible for Contract management for CustomerTypesController
    /// </summary>
    public interface ICustomerTypesContracts
    {
        Task<ActionResult<List<CustomerTypes>>> GetAllCustomerTypes();
    }
}
