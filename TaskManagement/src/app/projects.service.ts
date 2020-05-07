import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Project } from './project';
import { map } from "rxjs/operators";
import { Session } from 'protractor';
import { request } from 'http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient: HttpClient) 
  {

   }

   getAllProjects():Observable<Project[]>
   {
    
     


     return this.httpClient.get<Project[]>("/api/projects", {responseType:"json"})
     .pipe(map(
       (data: Project[])=>{
        for(let i = 0; i < data.length; i++){
          //data[i].teamSize = data[i].teamSize * 100;
        }
        return data;
      }
      ));
   }

   getProjectByProjectId(ProjectId: number): Observable<Project>
   {
     return this.httpClient.get<Project>("/api/projects/searchbyprojectid/" + ProjectId, {responseType: "json"});
   }

   insertProject(newProject : Project) : Observable<Project>{
     return this.httpClient.post<Project>("/api/projects", newProject, {responseType:"json"});
   }

   updateProject(existingProject : Project) : Observable<Project>{
    return this.httpClient.put<Project>("/api/projects", existingProject, {responseType:"json"});
  }

   deleteProject(ProjectId : number) : Observable<string>{
    return this.httpClient.delete<string>("/api/projects?ProjectId=" + ProjectId);
  }

  searchProjects(searchBy: string, searchText: string):Observable<Project[]>
   {
     return this.httpClient.get<Project[]>("/api/projects/search/" + searchBy +"/" + searchText, {responseType:"json"});
   }
}
