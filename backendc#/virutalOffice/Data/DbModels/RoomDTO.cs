using System.ComponentModel.DataAnnotations.Schema;

[Table("room")]
public class RoomDTO{
  [Column("roomid")]
  public int RoomId {get;set;}

  [Column("roomname")]
  public string RoomName {get;set;}

  [Column("ownerid")]
  public int OwnerId {get;set;}


  public ICollection<RoomUserDTO> RoomUsers {get;set;}
}
