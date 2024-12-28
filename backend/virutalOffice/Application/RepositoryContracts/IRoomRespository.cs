namespace VirtualOffice.Application
{
  public interface IRoomRespository{
    public Task<Room> GetRoom(int roomId);
    public Task<Room> CreateRoom(int ownerId);
  }
}
