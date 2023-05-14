import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm! :FormGroup;
  passwrdMismatch = false

  constructor(private formBuilder:FormBuilder) { 

    this.registerForm = this.formBuilder.group({
      firstName :'',
      lastName :'',
      email :'',
      passwrd :'',
      cfPasswrd :'',
    })
  }

  ngOnInit(): void {
  }
  register(){
    if(this.registerForm.value['passwrd'] !=  this.registerForm.value['cfPasswrd']) {
      this.passwrdMismatch = true
    }
    console.log(this.registerForm.value['passwrd'])
  }

}
