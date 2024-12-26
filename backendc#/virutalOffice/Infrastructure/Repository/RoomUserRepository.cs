using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace VirtualOffice.Application
{
  public class RoomUserRepository(AppDbContext dbContext) : IRoomUserRepository
  {
    public async Task AddUserToRoom(int roomId, int userId)
    {
      var dto = new RoomUserDTO
      {
        RoomId = roomId,
        UserId = userId,
        PosX = 0,
        PosY = 0
      };

      try
      {
        dbContext.RoomUser.Add(dto);
        await dbContext.SaveChangesAsync();
      }
      catch (DbUpdateException ex)
      {
        // Check if it's a duplicate entry exception
        if (ex.InnerException is PostgresException pgEx && pgEx.SqlState == "23505")
        {
          ;
        }
        else
        {
          throw;
        }
      }
    }
  }
}
