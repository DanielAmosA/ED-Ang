namespace Server.Infrastructure.MiddlewareInterfaces
{
    /// <summary>
    /// The interface responsible for Structure declaration for ExceptionRequest
    /// </summary>
    public interface IExceptionRequest
    {
        Task InvokeAsync(HttpContext context);
    }
}
