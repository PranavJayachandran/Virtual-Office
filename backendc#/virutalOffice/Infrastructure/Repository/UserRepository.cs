using VirtualOffice.Application;
using Microsoft.EntityFrameworkCore;

namespace VirtualOffice.Infra
{
    public class UserRepository(AppDbContext dbcontext): IUserRepository{
        public async Task<int> CreateUser(string username, string password){
          var user = new User{
            Username = username,
            Password = password
          };
          dbcontext.Users.Add(user);
          await dbcontext.SaveChangesAsync();
          return user.UserId;
            
        }
        public async Task<User> GetUser(string username, string password){
            var user = await dbcontext.Users.Where(u => u.Username == username && u.Password == password).FirstOrDefaultAsync();
            user.Password = "";
            if(user == null){
              throw new Exception("User not found ");
            }
            return user;
        }
    }
}
