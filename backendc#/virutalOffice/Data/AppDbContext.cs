using Microsoft.EntityFrameworkCore;

public class AppDbContext: DbContext{
  public AppDbContext(DbContextOptions<AppDbContext> options):base(options){
    
  }

  public DbSet<User> Users {get;set;}
  protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Fluent API configuration for the User entity
            modelBuilder.Entity<User>().ToTable("users");
        }
}
