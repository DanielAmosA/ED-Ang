using Server.Domain.Entities;

namespace Server.OrchestrationInterfaces
{
    /// <summary>
    /// The interface responsible for Structure declaration for CustomerTypesOrcRead
    /// </summary>
    public interface ICustomerTypesOrcRead
    {
        Task<List<CustomerTypes>> GetAll();
    }
}
