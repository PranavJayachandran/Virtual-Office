namespace VirtualOffice.Application
{
    internal class UserService (IUserRepository userRepository): IUserService
    {
        public async Task<int> CreateUser(string username, string password){
            return await userRepository.CreateUser(username, password);
        }
        public async Task<User> GetUser(string username, string password){
            return await userRepository.GetUser(username, password);
        }
    }
}
