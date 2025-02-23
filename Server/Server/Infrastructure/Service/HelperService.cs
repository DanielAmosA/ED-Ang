using Server.Infrastructure.ServiceInterfaces;
using System.ComponentModel.Design;
using System.Text;

namespace Server.Infrastructure.Service
{
    /// <summary>
    /// The class responsible for performs general actions
    /// </summary>
    public class HelperService : IHelperService
    {

        // Get Error string
        public string GenerateErrorString<TKey, TValue>(Dictionary<TKey, List<TValue>> errors)
        {
            StringBuilder result = new StringBuilder();

            foreach (KeyValuePair<TKey, List<TValue>> errRes in errors)
            {
                result.AppendLine($"Key: {errRes.Key}");
                foreach (TValue detail in errRes.Value)
                {
                    result.AppendLine($" - {detail}");
                }
            }

            return result.ToString();
        }
    }
}
