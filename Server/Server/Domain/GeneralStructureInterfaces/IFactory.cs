namespace Server.Domain.GeneralStructureInterfaces
{
    /// <summary>
    /// The interface responsible for Structure declaration for Generic Factory
    /// </summary>
    public interface IFactory<TModelFactory> where TModelFactory : class
    {
        TModelFactory Create();
    }
}
