import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly APIUrl = 'http://127.0.0.1:8000/';

  tokenHolder!: FormGroup
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { 
  
  }

  getTokenFromCookie() {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      
      // Check if the cookie starts with 'token='
      if (cookie.startsWith('token=')) {
        // Extract the token value after the '=' sign
        const token = cookie.substring('token='.length);
        
        // Return the token
        return token;
      }
    }
    
    // Token not found in the cookie
    return null;
  }

  login (val:any){
    return this.http.post(this.APIUrl+'api/users/login/',val)
  }
  register (val:any){
    return this.http.post(this.APIUrl+'api/users/register/',val)
  }

checkToken() {
  const token = this.getTokenFromCookie();

  this.tokenHolder = this.formBuilder.group({
    access: token
  });
  const params = this.tokenHolder.getRawValue();

  return this.http.get(this.APIUrl+'api/users/valid-token/',{params})

  }


refreshToken() {
    const token = this.getTokenFromCookie();
    this.tokenHolder = this.formBuilder.group({
      access: token
    });
    const params = this.tokenHolder.getRawValue();
    return this.http.get(this.APIUrl+'api/users/login/refresh/',{params})
    }
}
