namespace Server.Infrastructure.ServiceInterfaces
{
    /// <summary>
    /// The interface responsible for Generic Structure declaration for HelperService
    /// </summary>
    public interface IHelperService
    {
        string GenerateErrorString<TKey, TValue>(Dictionary<TKey, List<TValue>> errors);
    }
}
