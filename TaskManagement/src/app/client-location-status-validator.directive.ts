import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appClientLocationStatusValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: ClientLocationStatusValidatorDirective, multi: true}]
})
export class ClientLocationStatusValidatorDirective implements Validator{

  constructor() { }

  validate(control: AbstractControl):ValidationErrors | null
  {
    let isValid = true;
    if(control.value.ClientLocation == 6 && control.value.Status == "Support"){
      isValid = false;
    }
    if(isValid == true){
      return null;
    }
    else{
      return {ClientLocationStatus:{valid:false}};
    }
  }
  

}
