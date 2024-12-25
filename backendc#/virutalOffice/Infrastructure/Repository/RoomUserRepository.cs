namespace VirtualOffice.Application
{
  public class RoomUserRepository(AppDbContext dbContext): IRoomUserRepository{
    public async Task AddUserToRoom(int roomId, int userId){
      var dto = new RoomUserDTO{
        RoomId = roomId,
        UserId = userId
      };

      dbContext.RoomUser.Add(dto);
      await dbContext.SaveChangesAsync();
    }
  }
}
