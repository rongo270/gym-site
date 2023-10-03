using System.ComponentModel.DataAnnotations;

namespace gym_siteAPI.Models
{
    public class product
    {
        public Guid id { get; set; }
        //[MaxLength(50, ErrorMessage = "Product name cannot exceed 50 characters.")]
        public string name { get; set; }

        //[Range(0, 9999999, ErrorMessage = "Product price must be between 0 and 999,999.")]
        public int price { get; set; }
        //[Range(0,100, ErrorMessage = "Available must be between 0 and 100.")]
        public int available { get; set; }
        public string read { get; set; }
        public string? image { get; set; }


    }
}
