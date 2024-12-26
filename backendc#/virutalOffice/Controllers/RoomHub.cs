using Microsoft.AspNetCore.SignalR;
public class RoomHub : Hub
{
  public async Task JoinRoom(string roomId){
    await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
  }

  public async Task LeaveRoom(string roomId){
    await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId);
  }

  public async Task SendMessageToRoom(string roomId, UserPosition userPosition){
    await Clients.Group(roomId).SendAsync("UserMovement", Context.ConnectionId, userPosition);
  }
}
