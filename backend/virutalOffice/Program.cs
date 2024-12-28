using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => options.AddPolicy("CorsPolicy",
            builder =>
            {
                builder.AllowAnyHeader()
                       .AllowAnyMethod()
                       .SetIsOriginAllowed((host) => true)
                       .AllowCredentials();
            }));

builder.Services.AddDbContext<AppDbContext>(
    options =>
      options.UseNpgsql(builder.Configuration.GetConnectionString("PsqlDb"))
      .EnableSensitiveDataLogging()  // Log parameter values
     .LogTo(Console.WriteLine, LogLevel.Information)  // Log SQL que
    );

builder.Services.RegisterInfra();
builder.Services.RegisterApplicationService();
builder.Services.AddSignalR();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    context.Database.EnsureCreated();
}
app.UseCors("CorsPolicy");
app.MapHub<RoomHub>("/roomHub");
app.MapHub<VideoCallHub>("/videoCallHub");
app.MapControllers();
app.Run();
