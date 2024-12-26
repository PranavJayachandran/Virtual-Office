using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
       policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                         .AllowAnyMethod()
                          .AllowAnyHeader();
        });
});
builder.Services.AddDbContext<AppDbContext>(
    options =>
      options.UseNpgsql(builder.Configuration.GetConnectionString("PsqlDb"))
    );

builder.Services.RegisterInfra();
builder.Services.RegisterApplicationService();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();
app.MapControllers();
app.Run();
