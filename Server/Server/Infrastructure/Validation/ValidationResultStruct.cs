namespace Server.Infrastructure.Validation
{
    /// <summary>
    /// The class responsible for store results and manage errors for inputs, 
    /// with the isValid member indicating whether the inputs was successful 
    /// and the errors member containing error details if they occurred.
    /// </summary>
    public class ValidationResultStruct
    {
        public bool isValid { get; set; }

        //Maps a key(string) to a list of text strings(List<string>),
        //and it indicates the errors associated with the result.
        public Dictionary<string, List<string>>? errors { get; set; }
    }
}
