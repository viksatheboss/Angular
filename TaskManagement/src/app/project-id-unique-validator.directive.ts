import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors, AsyncValidator } from '@angular/forms';
import { ProjectsService } from './projects.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from './project';

@Directive({
  selector: '[appProjectIdUniqueValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: ProjectIdUniqueValidatorDirective, multi:true}]
})
export class ProjectIdUniqueValidatorDirective implements AsyncValidator {

  constructor(private projectService:ProjectsService) { }
 
  validate(control: AbstractControl):Observable <ValidationErrors | null>
  {
    return this.projectService.getProjectByProjectId(control.value).pipe(map((existingProject: Project)=>{
      if(existingProject!= null){
        return {uniqueProjectId: {valid: false}};
      }
      else{
        return null;
      }
      
    }))
  }
  
}
