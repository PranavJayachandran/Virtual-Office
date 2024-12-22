namespace VirtualOffice.Application
{
    public interface IUserRepository{
        public Task<int> CreateUser(string usernmae, string password);
        public Task<User> GetUser(string username, string password);
    }
}
