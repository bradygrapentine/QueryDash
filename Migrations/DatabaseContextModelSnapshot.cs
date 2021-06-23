﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using QueryDash.Models;

namespace QueryDash.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.3")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("DashPanel", b =>
                {
                    b.Property<int>("DashesId")
                        .HasColumnType("integer");

                    b.Property<int>("PanelsId")
                        .HasColumnType("integer");

                    b.HasKey("DashesId", "PanelsId");

                    b.HasIndex("PanelsId");

                    b.ToTable("DashPanel");
                });

            modelBuilder.Entity("QueryDash.Models.Dash", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("LinksPerPanel")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Dashes");
                });

            modelBuilder.Entity("QueryDash.Models.Panel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("FilterSite")
                        .HasColumnType("text");

                    b.Property<string>("FilterSiteName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Panels");
                });

            modelBuilder.Entity("QueryDash.Models.PanelAssignment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("DashId")
                        .HasColumnType("integer");

                    b.Property<int>("PanelId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("DashId");

                    b.HasIndex("PanelId");

                    b.ToTable("PanelAssignments");
                });

            modelBuilder.Entity("QueryDash.Models.SavedLink", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("DashId")
                        .HasColumnType("integer");

                    b.Property<bool>("IsArchive")
                        .HasColumnType("boolean");

                    b.Property<string>("QueryUrl")
                        .HasColumnType("text");

                    b.Property<DateTime>("TimeStamp")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("DashId");

                    b.ToTable("SavedLinks");
                });

            modelBuilder.Entity("QueryDash.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("HashedPassword")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DashPanel", b =>
                {
                    b.HasOne("QueryDash.Models.Dash", null)
                        .WithMany()
                        .HasForeignKey("DashesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("QueryDash.Models.Panel", null)
                        .WithMany()
                        .HasForeignKey("PanelsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("QueryDash.Models.PanelAssignment", b =>
                {
                    b.HasOne("QueryDash.Models.Dash", "RootDash")
                        .WithMany("DashPanelAssignments")
                        .HasForeignKey("DashId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("QueryDash.Models.Panel", "RootPanel")
                        .WithMany("DashPanelAssignments")
                        .HasForeignKey("PanelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("RootDash");

                    b.Navigation("RootPanel");
                });

            modelBuilder.Entity("QueryDash.Models.SavedLink", b =>
                {
                    b.HasOne("QueryDash.Models.Dash", "RootDash")
                        .WithMany("SavedLinks")
                        .HasForeignKey("DashId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("RootDash");
                });

            modelBuilder.Entity("QueryDash.Models.Dash", b =>
                {
                    b.Navigation("DashPanelAssignments");

                    b.Navigation("SavedLinks");
                });

            modelBuilder.Entity("QueryDash.Models.Panel", b =>
                {
                    b.Navigation("DashPanelAssignments");
                });
#pragma warning restore 612, 618
        }
    }
}
