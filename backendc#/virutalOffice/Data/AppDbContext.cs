using Microsoft.EntityFrameworkCore;

public class AppDbContext: DbContext{
  public AppDbContext(DbContextOptions<AppDbContext> options):base(options){
    
  }
  public DbSet<UserDTO> Users {get;set;}
  public DbSet<RoomUserDTO> RoomUser {get;set;}
  public DbSet<RoomDTO> Rooms {get;set;}


    protected override void OnModelCreating(ModelBuilder modelBuilder)
      {
          modelBuilder.Entity<UserDTO>()
          .HasKey(user => new {user.UserId});

          modelBuilder.Entity<RoomDTO>()
          .HasKey(room => new {room.RoomId});

          modelBuilder.Entity<RoomUserDTO>()
            .HasKey(ru => new {ru.RoomId, ru.UserId});
           
          modelBuilder.Entity<RoomUserDTO>()
          .HasIndex(o => new { o.RoomId, o.PosX, o.PosY })
            .IsUnique();

          modelBuilder.Entity<RoomUserDTO>()
          .HasOne(ru => ru.Room)
          .WithMany(r => r.RoomUsers)
          .HasForeignKey(ru => ru.RoomId);

          modelBuilder.Entity<RoomUserDTO>()
            .HasOne(ru => ru.User)
            .WithMany(r => r.RoomUsers)
            .HasForeignKey(ru => ru.UserId);

          modelBuilder.Entity<RoomUserDTO>()
            .HasCheckConstraint("RoomUserDTo_PosX_Positive", "[PosX] >= 0");
          modelBuilder.Entity<RoomUserDTO>()
            .HasCheckConstraint("RoomUserDTO_PosY_Positive", "[PosY] >= 0");



      }
}
