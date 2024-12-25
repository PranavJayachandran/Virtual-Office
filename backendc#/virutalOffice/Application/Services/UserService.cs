namespace VirtualOffice.Application
{
    internal class UserService (IUserRepository userRepository): IUserService
    {
        public async Task<int> CreateUser(User user){
            return await userRepository.CreateUser(user);
        }
        public async Task<User> GetUser(User user){
            return await userRepository.GetUser(user);
        }
    }
}
