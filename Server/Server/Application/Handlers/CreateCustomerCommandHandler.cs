//using Server.Application.Commands;
//using System.ComponentModel.DataAnnotations;

//namespace Server.Application.Handlers
//{
//    public class CreateCustomerCommandHandler : IRequestHandler<CreateCustomerCommand, CustomerDto>
//    {
//        private readonly ICustomerRepository _customerRepository;
//        private readonly IValidator<CreateCustomerCommand> _validator;
//        private readonly IMediator _mediator;

//        public async Task<CustomerDto> Handle(CreateCustomerCommand command, CancellationToken cancellationToken)
//        {
//            var validationResult = await _validator.ValidateAsync(command);
//            if (!validationResult.IsValid)
//                throw new ValidationException(validationResult.Errors);

//            var customer = new Customer
//            {
//                Name = command.Name,
//                CustomerNumber = command.CustomerNumber,
//                Created = DateTime.UtcNow
//            };

//            await _customerRepository.AddAsync(customer);
//            await _mediator.Publish(new CustomerCreatedEvent(customer.Id));

//            return _mapper.Map<CustomerDto>(customer);
//        }
//    }
//}
