import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpParams,HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup,FormArray, FormControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class PreferecesService {
  readonly APIUrl = 'http://127.0.0.1:8000/';
  updateForm !: FormGroup
  updateProfilForm!: FormGroup
  preferedTopics !: FormArray
  constructor( private http: HttpClient, private formBuilder : FormBuilder) { }

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

  updateTopics (vals : any) {
    const val = this.getUsername();
    this.updateForm = this.formBuilder.group({
      username: val,
      preferred_topics: new FormArray([])
    });
    const topicsArray = this.updateForm.get('preferred_topics') as FormArray;
    vals.forEach((value: any) => {
      topicsArray.push(new FormControl(value));
    });
    this.params = this.getUsername();
    const url = this.APIUrl + 'api/users/update/' + val + '/';
    return this.http.post(url, this.updateForm.getRawValue());

  }

  getPrefered() {
    const val = this.getUsername();
    const url = this.APIUrl + 'api/getFeatured/' + val + '/';
    return this.http.get(url);
  }

  updateProfil(vals : any) {
      this.updateProfilForm = this.formBuilder.group ({
        work : vals.work,
        start: vals.start,
        finish : vals.finish,
        gorcias : true
      })
      const val = this.getUsername();
      const url = this.APIUrl + 'api/users/update/' + val + '/';
      return this.http.post<any>(url, this.updateProfilForm.getRawValue());
  }

  storeGorcias(data: any) {
    const val = this.getUsername();
    const url = this.APIUrl + 'api/updateGorcias/' + val + '/';
    console.log(val)
    return this.http.post<any>(url, data);
  }
}
