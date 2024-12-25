using Microsoft.EntityFrameworkCore;
using VirtualOffice.Application;
using VirtualOffice.Data;
namespace VirtualOffice.Infra
{
  public class RoomRepository(AppDbContext dbContext) : IRoomRespository
  {
    public async Task<Room> CreateRoom(int ownerId){
      var dto = new RoomDTO{
        RoomName = "",
        OwnerId = ownerId,
      };
      dbContext.Rooms.Add(dto);
      await dbContext.SaveChangesAsync();

      var roomUserDTO = new RoomUserDTO{
        RoomId = dto.RoomId,
        UserId = ownerId
      };
      return DBModelDomainMapper.RoomDTOUserToRoom(dto, [roomUserDTO]);
    }

    public async Task<Room> GetRoom(int roomId){
      var dto = await dbContext.Rooms.FirstOrDefaultAsync((el) => el.RoomId == roomId);
      var roomUserDTO = await dbContext.RoomUser.Where((el) => el.RoomId == roomId).ToListAsync();
      return DBModelDomainMapper.RoomDTOUserToRoom(dto, roomUserDTO);
    }
  }
}
