import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { CountriesService } from '../countries.service';
import { Country } from '../country';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  genders=["male", "female"];
  countries: Country[]=[]

  constructor(private countriesService: CountriesService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.countries=this.countriesService.getCountries();
    this.signUpForm = this.formBuilder.group ({
      personName: this.formBuilder.group
        ({firstName: [null,[Validators.required, Validators.minLength(2)]],
        lastName:[null,[Validators.required, Validators.minLength(2)]],}),
      
      email:[null,[Validators.required, Validators.email]],
      mobile:[null,[Validators.required, Validators.pattern(/^[789]\d{9}$/)]],
      dateOfBirth:[null,[Validators.required]],
      gender:[null,[Validators.required]],
      countryId:[null,[Validators.required]],
      receiveNewsLetters:[null],
      skills:this.formBuilder.array([])
    });

    this.signUpForm.valueChanges.subscribe((value)=>{
      console.log(value);
    });
  }

  onSubmitClick(){
    //Display current form value
    this.signUpForm["submitted"]=true;
    console.log(this.signUpForm);

    //set value
    /*this.signUpForm.setValue({
      firstName: "Adam",
      lastName: "Smith",
      email: "smith@gmail.com",
      mobile: "987654321",
      dateOfBirth: "2020-01-01",
      gender: "male",
      countryId: 3,
      receiveNewsLetters: true
    });*/

    //patch value
    /*this.signUpForm.setValue({
      firstName: "Adam",
      lastName: "Smith",});*/

/*
      this.signUpForm.reset();

      this.signUpForm.reset({
      firstName: "Adam",
      lastName: "Smith",
      email: "smith@gmail.com"});  */

  }

  onAddSkill(){
    var formGroup = new FormGroup({
      skillName: new FormControl(null),
      level: new FormControl(null)
    });
    (<FormArray>this.signUpForm.get("skills")).push(formGroup);
  }

  onRemoveClick(index: number){
    (<FormArray>this.signUpForm.get("skills")).removeAt(index);
  }

}
