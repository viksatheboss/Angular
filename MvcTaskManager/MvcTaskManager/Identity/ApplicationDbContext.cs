using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MvcTaskManager.Models;

namespace MvcTaskManager.Identity
{
    public partial class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, String>
    {
        public ApplicationDbContext(DbContextOptions options): base(options)
        {

        }

        public DbSet<ClientLocation> ClientLocations { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ApplicationRole> ApplicationRoles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ClientLocation>().HasData(
                new ClientLocation() { ClientLocationId=1, ClientLocationName="Boston"},
                new ClientLocation() { ClientLocationId = 2, ClientLocationName = "New Delhi" },
                new ClientLocation() { ClientLocationId = 3, ClientLocationName = "New Jersy" },
                new ClientLocation() { ClientLocationId = 4, ClientLocationName = "New York" },
                new ClientLocation() { ClientLocationId = 5, ClientLocationName = "London" },
                new ClientLocation() { ClientLocationId = 6, ClientLocationName = "Tokyo" }
                );

            modelBuilder.Entity<Project>().HasData(
                new Project() { ProjectId = 1, ProjectName = "Hospital Management System", DateOfStart = Convert.ToDateTime("2017-8-1"), Active = true, Status = "In Force", TeamSize = 14 },
                new Project() { ProjectId = 2, ProjectName = "Reporting Tool", DateOfStart = Convert.ToDateTime("2018-3-6"), Active = true, Status = "Support", TeamSize = 81 }
                );
        }

        
    }
}
