using System.ComponentModel.DataAnnotations.Schema;

[Table("users")]
public class User{
  [Column("username")]
  public string Username {get;set;}

  [Column("password")]
  public string? Password {get;set;}

  [Column("userid")]
  public int UserId {get;set;}
}
