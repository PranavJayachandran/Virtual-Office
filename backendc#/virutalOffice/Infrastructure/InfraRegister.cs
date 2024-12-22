using VirtualOffice.Application;
using VirtualOffice.Infra;
public static class InfraRegistration
{
    public static void RegisterInfra(this IServiceCollection services)
    {
        services.AddScoped<IUserRepository, UserRepository>();
    }
}
