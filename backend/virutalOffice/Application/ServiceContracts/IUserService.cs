namespace VirtualOffice.Application
{
    public interface IUserService{
        public Task<int> CreateUser (User user);
        public Task<User> GetUser (User user);
        public Task<User>GetUser(int userId);
    }
}
