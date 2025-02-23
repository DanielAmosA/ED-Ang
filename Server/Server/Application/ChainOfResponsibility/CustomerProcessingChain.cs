//using Server.Application.Commands;
//using System.ComponentModel.DataAnnotations;

//namespace Server.Application.ChainOfResponsibility
//{
//    public interface ICustomerProcessor
//    {
//        ICustomerProcessor SetNext(ICustomerProcessor processor);
//        Task<CustomerDto> ProcessAsync(CreateCustomerCommand command);
//    }

//    public abstract class BaseCustomerProcessor : ICustomerProcessor
//    {
//        protected ICustomerProcessor _nextProcessor;

//        public ICustomerProcessor SetNext(ICustomerProcessor processor)
//        {
//            _nextProcessor = processor;
//            return processor;
//        }

//        public abstract Task<CustomerDto> ProcessAsync(CreateCustomerCommand command);
//    }

//    public class ValidationProcessor : BaseCustomerProcessor
//    {
//        private readonly IValidationStrategy _validationStrategy;

//        public override async Task<CustomerDto> ProcessAsync(CreateCustomerCommand command)
//        {
//            var validationResult = await _validationStrategy.ValidateAsync(command);
//            if (!validationResult.IsValid)
//                throw new ValidationException(validationResult.Errors);

//            return await _nextProcessor?.ProcessAsync(command);
//        }
//    }

//    public class CustomerCreationProcessor : BaseCustomerProcessor
//    {
//        private readonly ICustomerRepository _customerRepository;
//        private readonly IMapper _mapper;

//        public override async Task<CustomerDto> ProcessAsync(CreateCustomerCommand command)
//        {
//            var customer = _mapper.Map<Customer>(command);
//            await _customerRepository.AddAsync(customer);
//            return _mapper.Map<CustomerDto>(customer);
//        }
//    }

//}
