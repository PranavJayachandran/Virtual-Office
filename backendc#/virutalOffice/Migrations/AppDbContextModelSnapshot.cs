﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace virutalOffice.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("RoomDTO", b =>
                {
                    b.Property<int>("RoomId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("roomid");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("RoomId"));

                    b.Property<int>("OwnerId")
                        .HasColumnType("integer")
                        .HasColumnName("ownerid");

                    b.Property<string>("RoomName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("roomname");

                    b.HasKey("RoomId");

                    b.ToTable("room");
                });

            modelBuilder.Entity("RoomUserDTO", b =>
                {
                    b.Property<int>("RoomId")
                        .HasColumnType("integer")
                        .HasColumnName("roomid");

                    b.Property<int>("UserId")
                        .HasColumnType("integer")
                        .HasColumnName("userid");

                    b.Property<int>("PosX")
                        .HasColumnType("integer")
                        .HasColumnName("posx");

                    b.Property<int>("PosY")
                        .HasColumnType("integer")
                        .HasColumnName("posy");

                    b.HasKey("RoomId", "UserId");

                    b.HasIndex("UserId");

                    b.HasIndex("RoomId", "PosX", "PosY")
                        .IsUnique();

                    b.ToTable("room_user", t =>
                        {
                            t.HasCheckConstraint("RoomUserDTO_PosY_Positive", "\"PosY\" >= 0");

                            t.HasCheckConstraint("RoomUserDTo_PosX_Positive", "\"PosX\" >= 0");
                        });
                });

            modelBuilder.Entity("UserDTO", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("userid");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("UserId"));

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("password");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("username");

                    b.HasKey("UserId");

                    b.ToTable("user");
                });

            modelBuilder.Entity("RoomUserDTO", b =>
                {
                    b.HasOne("RoomDTO", "Room")
                        .WithMany("RoomUsers")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("UserDTO", "User")
                        .WithMany("RoomUsers")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Room");

                    b.Navigation("User");
                });

            modelBuilder.Entity("RoomDTO", b =>
                {
                    b.Navigation("RoomUsers");
                });

            modelBuilder.Entity("UserDTO", b =>
                {
                    b.Navigation("RoomUsers");
                });
#pragma warning restore 612, 618
        }
    }
}
