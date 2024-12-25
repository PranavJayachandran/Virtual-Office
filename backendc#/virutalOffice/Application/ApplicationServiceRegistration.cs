using VirtualOffice.Application;

public static class ApplicationServiceRegistration{
    public static void RegisterApplicationService(this IServiceCollection services){
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IRoomService, RoomService>();
    }
}
