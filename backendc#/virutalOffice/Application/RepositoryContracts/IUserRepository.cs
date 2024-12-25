namespace VirtualOffice.Application
{
    public interface IUserRepository{
        public Task<int> CreateUser(User user);
        public Task<User> GetUser(User user);
    }
}
