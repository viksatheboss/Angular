import { Component, OnInit, ViewChild } from '@angular/core';
import {ProjectsService} from "../../projects.service";
import {Project} from 'src/app/project';
import { ClientLocation } from 'src/app/client-location';
import { ClientLocationsService } from 'src/app/client-locations.service';
import { NgForm } from '@angular/forms';
import * as $ from "jquery";

@Component({
  selector: 'app-projects',
  templateUrl:'./projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[];
  clientLocations: ClientLocation[]=[];
  showLoading: boolean= true;

  newProject: Project = new Project();
  editProject: Project= new Project();
  editIndex: number = null;
  deleteProject: Project = new Project();
  deleteIndex: number = null;
  searchBy: string = "ProjectsName";
  searchText: string="";

  @ViewChild("newForm") newForm: NgForm;
  @ViewChild("editForm") editForm: NgForm;
  
  constructor(private projectsService:ProjectsService, private clientLocationService: ClientLocationsService) 
  { }

  ngOnInit(){
    this.projectsService.getAllProjects().subscribe(
      (response: Project[])=>{
        this.projects= response;
        this.showLoading = false;
      },
      (error)=>{
        console.log(error);
        alert("AuthenticationFailed");
      }
    );

    this.clientLocationService.getClientLocations().subscribe(
      (response)=>{
        this.clientLocations = response;
      }
      );
  }

  onNewClick(event){
    this.newForm.resetForm();
  }

  onSaveClick()
  {
    if(this.newForm.valid)
    {
      this.newProject.clientLocation.clientLocationId= 0;
      this.projectsService.insertProject(this.newProject)
      .subscribe((response)=>{
      // Add Project to Grid
      var p: Project = new Project();
      p.projectId = response.projectId;
      p.projectName = response.projectName;
      p.dateOfStart = response.dateOfStart;
      p.teamSize = response.teamSize;
      p.clientLocation = response.clientLocation;
      p.active = response.active;
      p.clientLocationId = response.clientLocationId;
      p.status = response.status;
      this.projects.push(p);
      

      //Clear New Project Dialog-TextBoxes
      this.newProject.projectId=null;
      this.newProject.projectName=null;
      this.newProject.dateOfStart=null;
      this.newProject.teamSize=null;
      this.newProject.active = false;
      this.newProject.clientLocationId = null;
      this.newProject.status = null;

      $("#newFormCancel").trigger("click");
    }, (error)=>{
      console.log(error);
    });
    }
    
  }

  onEditClick(event, index:number)
  {
    this.editForm.resetForm();
    setTimeout(()=>{
      this.editProject.projectId = this.projects[index].projectId;
    this.editProject.projectName = this.projects[index].projectName;
    this.editProject.dateOfStart = this.projects[index].dateOfStart.split("/").reverse().join("-");
    this.editProject.teamSize = this.projects[index].teamSize;
    this.editProject.active = this.projects[index].active;
    this.editProject.clientLocationId = this.projects[index].clientLocationId;
    this.editProject.clientLocation = this.projects[index].clientLocation;
    this.editProject.status = this.projects[index].status;
    this.editIndex = index;
    },100
    );
    
  }

  onUpdateClick()
  {
    if(this.editForm.valid)
    {
      this.projectsService.updateProject(this.editProject)
      .subscribe((response: Project)=>{
        var p :Project= new Project();
        p.projectId = response.projectId;
        p.projectName = response.projectName;
        p.dateOfStart = response.dateOfStart;
        p.teamSize = response.teamSize;
        p.clientLocation = response.clientLocation;
        p.active = response.active;
        p.clientLocationId = response.clientLocationId;
        p.status = response.status;
        this.projects[this.editIndex] = p;
  
        this.newProject.projectId=null;
        this.newProject.projectName=null;
        this.newProject.dateOfStart=null;
        this.newProject.teamSize=null;
        this.newProject.clientLocation= null;
        this.newProject.active = false;
        this.newProject.status=null;

        $("#editFormCancel").trigger("click");
      }, (error)=>{
        console.log(error);
      })
    }
  }

  onDeleteClick(event, index: number)
  {
    this.deleteProject.projectId = this.projects[index].projectId;
    this.deleteProject.projectName = this.projects[index].projectName;
    this.deleteProject.dateOfStart = this.projects[index].dateOfStart;
    this.deleteProject.teamSize = this.projects[index].teamSize;
    
  }

  onDeleteConfirmClick()
  {
    this.projectsService.deleteProject(this.deleteProject.projectId).subscribe((response)=>{
      this.projects.splice(this.deleteIndex, 1);
      this.deleteProject.projectId = null;
      this.deleteProject.projectName = null;
      this.deleteProject.dateOfStart = null;
      this.deleteProject.teamSize = null;
    },
    (error)=>{
      console.log(error);

    });
  }

  onSearchClick()
  {
    this.projectsService.searchProjects(this.searchBy, this.searchText).subscribe(
      (response: Project[])=>{
        this.projects = response;
      },
      (error)=>
      {
        console.log(error);
      })
  }


}
