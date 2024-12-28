using VirtualOffice.Application;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
public class RoomHub(IRoomService roomService) : Hub
{
  private static ConcurrentDictionary<RoomUser, string> roomUsers = new ConcurrentDictionary<RoomUser, string>();
  public async Task JoinRoom(string roomId, string userId)
  {
    var roomUser = new RoomUser
    {
      RoomId = roomId,
      UserId = userId
    };
    roomUsers[roomUser] = Context.ConnectionId;
    await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
  }

  public async Task LeaveRoom(string roomId, string userId)
  {
        var roomUser = new RoomUser
        {
            RoomId = roomId,
            UserId = userId
        };
        roomUsers.TryRemove(roomUser, out _);
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId);
  }

  public async Task SendMessageToRoom(string roomId, UserPosition userPosition)
  {
    await roomService.MoveUser(Int32.Parse(roomId), userPosition.UserId, userPosition.PosX, userPosition.PosY);
    await Clients.Group(roomId).SendAsync("UserMovement", userPosition);
   }


    public async Task SendVideoCallRequest(string roomId, string recieverUserId, string senderUserId)
    {

        var roomUser = new RoomUser
        {
            RoomId = roomId,
            UserId = recieverUserId
        };
        if (roomUsers.TryGetValue(roomUser, out var connectionIdOfReciever))
        {
            await Clients.Client(connectionIdOfReciever).SendAsync("VideoCallRequest", senderUserId, Context.ConnectionId);
        }
        else
        {
            Console.WriteLine("Receiver not found in the room.");
        }
    }
}

public class RoomUser
{
  public string RoomId { get; set; }
  public string UserId { get; set; }
     public override bool Equals(object obj)
    {
        if (obj is RoomUser other)
        {
            return RoomId == other.RoomId && UserId == other.UserId;
        }
        return false;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(RoomId, UserId);
    }
}