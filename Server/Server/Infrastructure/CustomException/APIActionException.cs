namespace Server.Infrastructure.CustomException
{
    /// <summary>
    /// The class responsible for custom error for a situation 
    /// where the api action failed
    /// because of logic api.
    /// </summary>
    public class APIActionException : Exception
    {
        public int StatusCode { get; set; }

        public APIActionException(string message) : base(message)
        {
            StatusCode = 503;
        }
    }
}
