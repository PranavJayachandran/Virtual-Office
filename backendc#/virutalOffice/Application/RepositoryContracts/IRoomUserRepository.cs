namespace VirtualOffice.Application
{
  public interface IRoomUserRepository{
    public Task AddUserToRoom(int roomId, int userId);
    public Task MoveUserInRoom(int roomId, int userId, int posX, int posY);
  }
}
