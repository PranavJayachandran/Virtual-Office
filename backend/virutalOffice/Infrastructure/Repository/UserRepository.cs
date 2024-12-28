using VirtualOffice.Application;
using Microsoft.EntityFrameworkCore;
using VirtualOffice.Data;

namespace VirtualOffice.Infra
{
  public class UserRepository(AppDbContext dbcontext) : IUserRepository
  {
    public async Task<int> CreateUser(User user)
    {
      var dto = DomainDBModelMapper.UserToUserDTO(user);
      dbcontext.Users.Add(dto);
      await dbcontext.SaveChangesAsync();
      return dto.UserId;

    }
    public async Task<User> GetUser(User user)
    {
      var dto = await dbcontext.Users.Where(u => u.Username == user.Username && u.Password == user.Password).FirstOrDefaultAsync();
      if (user == null)
      {
        throw new Exception("User not found ");
      }
      return DBModelDomainMapper.UserDTOToUser(dto);
    }

    public async Task<User> GetUser(int userId)
    {
      var result = await dbcontext.Users.Select(user => new { user.UserId, user.Username }).Where(u => u.UserId == userId).FirstOrDefaultAsync();
      if(result == null)
        throw new Exception("User not found");
      var user = new User{
        UserId = result.UserId,
        Username = result.Username
      };
      return user;
    }
  }
}
