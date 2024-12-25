namespace VirtualOffice.Application
{
  public interface IRoomUserRepository{
    public Task AddUserToRoom(int roomId, int userId);
  }
}
