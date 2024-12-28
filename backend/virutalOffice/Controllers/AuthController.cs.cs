using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using VirtualOffice.Application;

namespace VirtualOffice.Controllers
{
  [ApiController]
  [Route("api/auth")]
  public class AuthController(IUserService userService): ControllerBase
  {
    [HttpPost]
    [Route("login")]
    public async Task<User> GetUser([FromBody] UserModel user){
      if(!ValidateUser(user)){
        throw new Exception("Username or password was empty");
      }
      var result = await userService.GetUser(ControllerModelDomainMapper.UserToUserModelMapper(user));
      result.Password = "";
      return result;  
    }

    [HttpPost]
    [Route("sign-up")]
    public async Task<int> CreateUser([FromBody] UserModel user){
      if(!ValidateUser(user)){
        throw new Exception("Username or password was empty");
      }
      return await userService.CreateUser(ControllerModelDomainMapper.UserToUserModelMapper(user));
    }  


    private Boolean ValidateUser(UserModel user){
      return !String.IsNullOrEmpty(user.Username) && !String.IsNullOrEmpty(user.Password);
    }
  }
}
