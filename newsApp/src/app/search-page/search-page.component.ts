import { Component, OnInit } from '@angular/core';
import { NewsServiceService } from '../news-service.service';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  search = false
  listeTest = []
  vals!: FormGroup
  constructor( private newsService : NewsServiceService,private authService : AuthService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.vals = this.formBuilder.group({
      input :''
    })
    this.authService.checkToken().subscribe(data => {
      this.authService.refreshToken().subscribe(data=> {

      })
    },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          if(this.isCookieDeleted()) {
            window.location.href='/'
          }
        }
      }
    );
    // this.authService.checkToken()
  }

  goClick() {
  this.search = true
  this.getNews()
  }

  getNews () {

    this.newsService.getNews(this.vals.getRawValue()).subscribe(data=>{
    let vals =JSON.parse(data.toString())
    this.listeTest = vals
    })
  }

  navigateToUrl(url: string) {
    window.open(url, '_blank');
  }


  isCookieDeleted() {
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      
      // Check if the cookie starts with the provided name
      if (cookie.startsWith(`${'token'}=`)) {
        // Cookie still exists
        return false;
      }
    }
    
    // Cookie is deleted
    return true;
  }
  
}
