namespace VirtualOffice.Application{
  public class RoomService (IRoomRespository roomRespository, IRoomUserRepository roomUserRepository): IRoomService {
    public async Task<Room> CreateRoom(int userId){
      var room = await roomRespository.CreateRoom(userId);
      await roomUserRepository.AddUserToRoom(room.RoomId, userId);
      return room;
    }
    public async Task<Room> JoinRoom(int roomId, int userId){
      await roomUserRepository.AddUserToRoom(roomId, userId);
      return await roomRespository.GetRoom(roomId);
    }
  }
}
