using Server.Domain.Entities;

namespace Server.OrchestrationInterfaces
{
    /// <summary>
    /// The interface responsible for Structure declaration for CustomersOrcWrite
    /// </summary>
    public interface ICustomersOrcWrite
    {
        Task CreateNewCustomer(Customers newCustomer);
        Task UpdateCustomer(int id, Customers updateCustomer);

        Task DeleteCustomer(int id);
    }
}
