import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsServiceService {
  readonly APIUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) { }

  getNews (val : any){
    const params = val
    return this.http.get(this.APIUrl+'api/getNews',{params})
  }
}
