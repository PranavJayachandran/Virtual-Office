namespace VirtualOffice.Controllers{
    public static class DomainControllerModelMapper{
        public static UserModel UserModelToUserMapper(User user){
            return new UserModel{
                UserId = user.UserId,
                Username = user.Username,
                Password = ""
            };
        }
    }


    public static class ControllerModelDomainMapper{
        public static User UserToUserModelMapper(UserModel user){
            return new User{
                UserId = user.UserId,
                Username = user.Username,
                Password = user.Password
            };
        }
    }
}
