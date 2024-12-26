using Microsoft.AspNetCore.Mvc;
using VirtualOffice.Application;
namespace VirtualOffice.Controllers{

  [ApiController]
  [Route("api/room")]
  public class RoomController(IRoomService roomService): ControllerBase 
  {
    
    [HttpPut]
    [Route("")]
    public Task<Room> CreateRoom([FromBody] UserIdModel user){
      return roomService.CreateRoom(user.UserId);
    }

    [HttpPost]
    [Route("")]
    public Task<Room> JoinRoom([FromBody] RoomUserModel room){
      return roomService.JoinRoom(room.RoomId, room.UserId);
    }

    [HttpGet]
    [Route("")]
    public Task<Room> GetRoom([FromQuery] int roomId){
      return roomService.GetRoom(roomId);
    }
  }

  public class UserIdModel{
    public int UserId {get;set;}
  }

  public class RoomUserModel{
    public int RoomId {get;set;}
    public int UserId {get;set;}
  }
}
