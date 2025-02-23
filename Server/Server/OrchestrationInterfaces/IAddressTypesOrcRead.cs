using Server.Domain.Entities;

namespace Server.OrchestrationInterfaces
{
    /// <summary>
    /// The interface responsible for Structure declaration for AddressTypesOrcRead
    /// </summary>
    public interface IAddressTypesOrcRead
    {
        Task<List<AddressTypes>> GetAll();
    }
}
