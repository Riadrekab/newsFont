import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NewsServiceService {
  readonly APIUrl = 'http://127.0.0.1:8000/';

  saveForm !: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

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
  

  getNews (val : any){
    const params = val
    return this.http.get(this.APIUrl+'api/getNews',{params})
  }

  saveFavorite(vals : any) {
    let username = this.getUsername()
    const url = this.APIUrl+ 'api/users/results/save/'+ username +'/'
    return this.http.post(url, vals)
  }
  saveSearch (vals: any) {
      this.saveForm = this.formBuilder.group( {
        username : this.getUsername(),
        search : vals
      })
      console.log(this.saveForm.value)
      return this.http.post(this.APIUrl+'api/saveSearch',this.saveForm.getRawValue())
  }
}
