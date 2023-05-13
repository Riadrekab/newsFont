import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly APIUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) { 
    login (){
      return this.http.get(this.APIUrl+'api/getNews')
    }
    
  }
}
