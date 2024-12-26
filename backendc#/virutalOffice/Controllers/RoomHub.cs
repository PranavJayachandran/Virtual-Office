using VirtualOffice.Application;
using Microsoft.AspNetCore.SignalR;
public class RoomHub(IRoomService roomService) : Hub
{
  public async Task JoinRoom(string roomId){
    await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
  }

  public async Task LeaveRoom(string roomId){
    await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId);
  }

  public async Task SendMessageToRoom(string roomId, UserPosition userPosition){
    await roomService.MoveUser(Int32.Parse(roomId), userPosition.UserId, userPosition.PosX, userPosition.PosY);
    await Clients.Group(roomId).SendAsync("UserMovement", Context.ConnectionId, userPosition);
  }
}
