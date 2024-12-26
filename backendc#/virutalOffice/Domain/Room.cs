
public class Room{
  public int RoomId {get;set;}
  public int OwnerId {get;set;}
  public List<UserPosition>UserIds {get;set;} = [];
}

public class UserPosition{
  public int UserId {get;set;}
  public int PosX {get;set;}
  public int PosY {get;set;}
}
