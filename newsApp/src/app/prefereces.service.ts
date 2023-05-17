import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PreferecesService {
  readonly APIUrl = 'http://127.0.0.1:8000/';

  constructor( private http: HttpClient) { }

 params:any = 'string'

  getUsername() {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      
      // Check if the cookie starts with 'token='
      if (cookie.startsWith('username=')) {
        // Extract the token value after the '=' sign
        const token = cookie.substring('username='.length);
        
        // Return the token
        return token;
      }
    }
    
    // Token not found in the cookie
    return null;
  }

  checkTopics (){
    this.params = this.getUsername();
    // return this.http.get(this.APIUrl+'api/topics/',{params :  this.params})
    const url = this.APIUrl + 'api/topics/' + this.params+'/';
    return this.http.get(url);
  }

  checkTopicsGen (){
    const url = this.APIUrl + 'api/topics/';
    return this.http.get<any[]>(url);
  }
}
