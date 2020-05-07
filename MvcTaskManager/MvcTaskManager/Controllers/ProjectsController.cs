using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MvcTaskManager.Identity;
using MvcTaskManager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using MvcTaskManager.ViewModels;

namespace MvcTaskManager.Controllers
{
    
    public class ProjectsController : Controller
    {
        private ApplicationDbContext db;
        public ProjectsController(ApplicationDbContext db)
        {
            this.db = db;
        }
        [HttpGet]
        [Route("api/projects")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult Get()
        {
            System.Threading.Thread.Sleep(1000);
            List<Project> projects = db.Projects.Include("ClientLocation").ToList();
            List<ProjectViewModel> projectsViewModel = new List<ProjectViewModel>();
            foreach (var project in projects)
            {
                projectsViewModel.Add(new ProjectViewModel() { ProjectId = project.ProjectId, ProjectName = project.ProjectName, TeamSize = project.TeamSize, DateOfStart = project.DateOfStart.ToString("dd/MM/yyyy"), Active = project.Active, ClientLocation = project.ClientLocation, ClientLocationId = project.ClientLocationId, Status = project.Status });
            }
            return Ok(projectsViewModel);
        }

        
            

        [HttpGet]
        [Route("api/projects/search/{searchby}/{searchtext}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult Search(string searchBy, string searchText)
        {
            
            List<Project> projects = null;
            if(searchBy == "ProjectId")
            
                projects = db.Projects.Where(temp => temp.ProjectId.ToString().Contains(searchText)).ToList();
            
            else if (searchBy == "ProjectName")
            
                projects = db.Projects.Where(temp => temp.ProjectName.Contains(searchText)).ToList();
            
            if (searchBy == "DateOfStart")
            
                projects = db.Projects.Where(temp => temp.DateOfStart.ToString().Contains(searchText)).ToList();
            
            if (searchBy == "TeamSize")
      
                projects = db.Projects.Where(temp => temp.TeamSize.ToString().Contains(searchText)).ToList();

            List<ProjectViewModel> projectViewModel = new List<ProjectViewModel>();
            foreach (var project in projects)
            {
                projectViewModel.Add(new ProjectViewModel() { ProjectId = project.ProjectId, ProjectName = project.ProjectName, TeamSize = project.TeamSize, DateOfStart = project.DateOfStart.ToString("dd/MM/yyyy"), Active = project.Active, ClientLocation = project.ClientLocation, ClientLocationId = project.ClientLocationId, Status = project.Status });
            }
            return Ok(projectViewModel);
        }

        [HttpGet]
        [Route("api/projects/searchebyprojectid/{searchby}/{searchtext}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetProjectByProjectId(int ProjectId)
        {
            Project project = db.Projects.Include("ClientLocation").Where(temp => temp.ProjectId == ProjectId).FirstOrDefault();

            ProjectViewModel projectViewModel = new ProjectViewModel()
            {
                ProjectId = project.ProjectId,
                ProjectName = project.ProjectName,
                TeamSize = project.TeamSize,
                DateOfStart = project.DateOfStart.ToString("dd/MM/yyyy"),
                Active = project.Active,
                ClientLocation = project.ClientLocation,
                ClientLocationId = project.ClientLocationId,
                Status = project.Status
            };
           
            return Ok(projectViewModel);
        }


        [HttpPost]
        [Route("api/projects")]
        [Authorize]
        [ValidateAntiForgeryToken]
        public IActionResult Post([FromBody]Project project)
        {
            project.ClientLocation = null;
            db.Projects.Add(project);
            db.SaveChanges();

            Project existingProject = db.Projects.Include("ClientLocation").Where(temp => temp.ProjectId == project.ProjectId).FirstOrDefault();
            ProjectViewModel projectViewModel = new ProjectViewModel() { ProjectId = existingProject.ProjectId, 
                ProjectName = existingProject.ProjectName, TeamSize = existingProject.TeamSize, 
                DateOfStart = existingProject.DateOfStart.ToString("dd/MM/yyyy"), Active = existingProject.Active,
                ClientLocation = existingProject.ClientLocation, ClientLocationId = existingProject.ClientLocationId,
                Status = existingProject.Status };

            
            return Ok(projectViewModel);
        }

        [HttpPut]
        [Route("api/projects")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult Put([FromBody]Project project)
        {
            
            Project existingProject = db.Projects.Where(temp => temp.ProjectId == project.ProjectId).FirstOrDefault();
            if(existingProject != null)
            {
                existingProject.ProjectName = project.ProjectName;
                existingProject.DateOfStart = project.DateOfStart;
                existingProject.TeamSize = project.TeamSize;
                existingProject.Active = project.Active;
                existingProject.ClientLocationId = project.ClientLocationId;
                existingProject.Status = project.Status;
                existingProject.ClientLocation = null;

                db.SaveChanges();

                Project existingProject2 = db.Projects.Include("ClienLocation").Where(temp => temp.ProjectId == project.ProjectId).FirstOrDefault();
                ProjectViewModel projectViewModel = new ProjectViewModel()
                {
                    ProjectId = existingProject2.ProjectId,
                    ProjectName = existingProject2.ProjectName,
                    TeamSize = existingProject2.TeamSize,
                    ClientLocationId = existingProject2.ClientLocationId,
                    DateOfStart = existingProject2.DateOfStart.ToString("dd/MM/yyyy"),
                    Active = existingProject2.Active,
                    Status = existingProject2.Status,
                    ClientLocation = existingProject2.ClientLocation
                };
                return Ok(projectViewModel);

                
            }
            else
            {
                return null;
            }    
        }

        [HttpDelete]
        [Route("api/projects")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public int Delete(int ProjectId)
        {
            
            Project existingProject = db.Projects.Where(temp => temp.ProjectId == ProjectId).FirstOrDefault();
            if (existingProject != null)
            {

                db.Remove(existingProject);
                db.SaveChanges();
                return ProjectId;
            }
            else
            {
                return -1;
            }
        }

    }
}