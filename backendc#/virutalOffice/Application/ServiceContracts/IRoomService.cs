namespace VirtualOffice.Application
{
  public interface IRoomService{
    public Task<Room> CreateRoom(int userId);
    public Task<Room> JoinRoom(int roomId, int userId);
    public Task<Room> GetRoom(int roomId);
    public Task MoveUser(int roomId, int userId, int posX, int posY);
  }
}
