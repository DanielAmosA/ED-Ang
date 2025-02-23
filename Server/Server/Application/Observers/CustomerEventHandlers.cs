//namespace Server.Application.Observers
//{
//    public class CustomerCreatedEventHandler : INotificationHandler<CustomerCreatedEvent>
//    {
//        private readonly ILogger<CustomerCreatedEventHandler> _logger;
//        private readonly IEmailService _emailService;

//        public CustomerCreatedEventHandler(ILogger<CustomerCreatedEventHandler> logger, IEmailService emailService)
//        {
//            _logger = logger;
//            _emailService = emailService;
//        }

//        public async Task Handle(CustomerCreatedEvent notification, CancellationToken cancellationToken)
//        {
//            _logger.LogInformation($"Customer {notification.CustomerId} was created");
//            await _emailService.SendNewCustomerNotificationAsync(notification.CustomerId);
//        }
//    }

//}
