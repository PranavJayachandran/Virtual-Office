using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using VirtualOffice.Application;

namespace VirtualOffice.Controllers
{
  [ApiController]
  [Route("api/auth")]
  public class UserController(IUserService userService): ControllerBase
  {
    [HttpPost]
    [Route("/login")]
    public async Task<User> GetUser([FromBody] User user){
      if(!ValidateUser(user)){
        throw new Exception("Username or password was empty");
      }
      return await userService.GetUser(user.Username, user.Password);
    }

    [HttpPost]
    [Route("/sign-up")]
    public async Task<int> CreateUser([FromBody] User user){
      if(!ValidateUser(user)){
        throw new Exception("Username or password was empty");
      }
      return await userService.CreateUser(user.Username, user.Password);
    }
    


    private Boolean ValidateUser(User user){
      return !String.IsNullOrEmpty(user.Username) && !String.IsNullOrEmpty(user.Password);
    }
  }
}
