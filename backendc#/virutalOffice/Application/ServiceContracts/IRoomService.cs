namespace VirtualOffice.Application
{
  public interface IRoomService{
    public Task<Room> CreateRoom(int userId);
    public Task<Room> JoinRoom(int roomId, int userId);
  }
}
