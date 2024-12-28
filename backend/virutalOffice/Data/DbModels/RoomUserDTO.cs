using System.ComponentModel.DataAnnotations.Schema;

[Table("room_user")]
public class RoomUserDTO{

  [Column("roomid")]
  public int RoomId {get;set;}

  [Column("userid")]
  public int UserId {get;set;}

  [Column("posx")]
  public int PosX {get;set;}

  [Column("posy")]
  public int PosY {get;set;}

  public RoomDTO Room {get;set;}
  public UserDTO User {get;set;}
}
