import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  noEmail = false;
  noPswd = false;

  constructor(private formBuilder: FormBuilder,private authService : AuthService) { 
    this.loginForm = this.formBuilder.group({
      identifier :'',
      password:''
    })
  }

  ngOnInit(): void {
  }

  login(){
    this.noEmail = false;
    this.noPswd = false;

    if(this.loginForm.value['identifier']=='') {
    this.noEmail = true;

    }
    if(this.loginForm.value['noPswd']=='') {
      this.noPswd = true;
    }
    if (this.noPswd == false && this.noEmail == false ) {
      this.authService.login(this.loginForm.getRawValue()).subscribe(data=> {
        // Have to add token
        window.location.href = '/search-page'
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log('Wrong passeword');
        } else if(error.status ===404) {
          console.log("Email not found")
        }
        else {
          console.log('An error occurred:', error.error.message);
        }
      }
    );
    }
    
  }
}
