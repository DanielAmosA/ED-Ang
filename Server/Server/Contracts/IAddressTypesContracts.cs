using Microsoft.AspNetCore.Mvc;
using Server.Domain.Entities;

namespace Server.Contracts
{
    /// <summary>
    /// The interface responsible for Contract management for AddressTypesController
    /// </summary>
    public interface IAddressTypesContracts
    {
        Task<ActionResult<List<AddressTypes>>> GetAllAddressTypes();
    }
}
