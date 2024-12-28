namespace VirtualOffice.Data
{
  public static class DomainDBModelMapper{
    public static UserDTO UserToUserDTO(User user){
      return new UserDTO{
          UserId = user.UserId,
          Username = user.Username,
          Password = user.Password ?? ""
      };
    }
  }


  public static class DBModelDomainMapper{
    public static User UserDTOToUser(UserDTO dto){
      return new User{
        UserId = dto.UserId,
        Username = dto.Username,
        Password = dto.Password
      };
    }

    public static Room RoomDTOUserToRoom(RoomDTO roomDto, List<RoomUserDTO> roomUserDto){
      var room = new Room{
        RoomId = roomDto.RoomId,
        OwnerId = roomDto.OwnerId,
        UserIds = []
      };

      foreach(var item in roomUserDto){
        room.UserIds.Add(new UserPosition{
            UserId = item.UserId,
            PosX = item.PosX,
            PosY = item.PosY
            });
      }

      return room;
    }
  }
} 
