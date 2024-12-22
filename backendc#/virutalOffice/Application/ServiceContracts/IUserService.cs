namespace VirtualOffice.Application
{
    public interface IUserService{
        public Task<int> CreateUser (string username, string password);
        public Task<User> GetUser (string username ,string password);
    }
}
