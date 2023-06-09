import { Component, Inject, OnInit } from '@angular/core';
import { NewsServiceService } from '../news-service.service';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  search = false
  listeTest = []
  clickedItems: boolean[] = [];

  full = true
  vals!: FormGroup
  saveRes!: FormGroup
  isClicked = false;


  constructor( private newsService : NewsServiceService,private authService : AuthService,private formBuilder: FormBuilder,@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.vals = this.formBuilder.group({
      input :''
    })
    this.saveRes = this.formBuilder.group({
      url :'',
      image :'',
      body :'',
      title :''

    })
    this.authService.checkToken().subscribe(data => {
      this.authService.refreshToken().subscribe(data=> {
        this.document.cookie = `token=${(data as any).access }; path=/`;
        this.document.cookie = `refresh=${(data as any).refresh}; path=/`;
      })
    },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';


          if(this.isCookieDeleted('token') && this.isCookieDeleted('refresh')) {
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
      if ((this.listeTest.length)==0) {
        this.full = false
      }
      else {
        this.clickedItems = new Array(this.listeTest.length).fill(false);
        this.newsService.saveSearch(this.vals.value['input']).subscribe(data => {
          console.log(data)
        })
      }
      })
  }

  navigateToUrl(url: string) {
    window.open(url, '_blank');
  }

  saveNews(title: any, body: any, image:any, url:any,index: number) {
    this.clickedItems[index] = !this.clickedItems[index];
    if (this.clickedItems[index] == true) {
      this.saveRes = this.formBuilder.group({
        url :url,
        image :image,
        body :body,
        title :title
      })
      this.newsService.saveFavorite(this.saveRes.getRawValue()).subscribe(data => {

      })
    }
  }


  isCookieDeleted(value:any) {
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      
      // Check if the cookie starts with the provided name
      if (cookie.startsWith(`${value}=`)) {
        // Cookie still exists
        return false;
      }
    }
    
    // Cookie is deleted
    return true;
  }
  
}


