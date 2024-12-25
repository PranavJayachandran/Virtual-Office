using System.ComponentModel.DataAnnotations.Schema;

[Table("user")]
public class UserDTO{
  [Column("username")]
  public string Username {get;set;}

  [Column("password")]
  public string Password {get;set;}

  [Column("userid")]
  public int UserId {get;set;}


  public ICollection<RoomUserDTO> RoomUsers {get;set;}
}
