using Microsoft.AspNetCore.Mvc;
using VirtualOffice.Application;

namespace VirtualOffice.Controllers{
  
  [ApiController]
  [Route("api/user")]
  public class UserController (IUserService userService): ControllerBase{
    [HttpGet]
    public async Task<User> GetUserAsync([FromQuery] int userId){
      return await userService.GetUser(userId);
    }
  }
}
