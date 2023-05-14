import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm! :FormGroup;
  passwrdMismatch = false
  noPaswd = false
  wrongEmail = false
  noEmail = false
  noLast  = false
  noFirst  = false
  noUsrnm  = false


  constructor(private formBuilder:FormBuilder, private authService : AuthService) { 

    this.registerForm = this.formBuilder.group({
      first_name :'',
      last_name :'',
      email :'',
      username:'',
      password :'',
      password_confirmation :'',
    })
  }

  ngOnInit(): void {
  }
  register(){
    this.passwrdMismatch = false
    this.noPaswd = false
    this.wrongEmail = false
    this.noEmail = false
    this.noLast  = false
    this.noFirst  = false
    this.noUsrnm  = false


    if(this.registerForm.value['first_name'] ==  '') {
      this.noFirst  = true
    }
    if(this.registerForm.value['last_name'] ==  '') {
      
      this.noLast  = true
    }
    if(this.registerForm.value['username'] ==  '') {
      
      this.noUsrnm  = true
    }
    if(this.registerForm.value['email'] ==  '') {
      
      this.noEmail = true
    }
    else if(!this.isEmailValid(this.registerForm.value['email'])) {
      this.wrongEmail = true
    }

    if(this.registerForm.value['password'] ==  '') {
      this.noPaswd = true
    }
    

    if(this.registerForm.value['password'] !=  this.registerForm.value['password_confirmation']) {
      this.passwrdMismatch = true
    }

    if( this.passwrdMismatch == false && this.noPaswd == false && this.wrongEmail == false && this.noEmail == false && this.noLast  == false &&this.noFirst  == false && this.noUsrnm  == false ) {
      this.authService.register(this.registerForm.getRawValue()).subscribe(data=>{
        if (data =='User was created') {
          window.location.href ='/search-page'
        }
      })
    }
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);

  }

}
