using System.ComponentModel.DataAnnotations.Schema;

//[Table("user")]
public class user
{
    // Properties here should match the columns in your existing 'users' table.
    public Guid id { get; set; }
    public string email { get; set; }
    public string password { get; set; }
    public string name { get; set; }
    public string lastName { get; set; }
    public bool admin { get; set; }
}
