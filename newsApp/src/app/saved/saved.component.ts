import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { NewsServiceService } from '../news-service.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {
  full =  true;
  listeTest: any[] = [];


  constructor(private authService : AuthService,private formBuilder: FormBuilder,@Inject(DOCUMENT) private document: Document,
  private newsService:  NewsServiceService,
  ) { }

  ngOnInit(): void {
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
    this.newsService.getSaved().subscribe(data => {
      this.listeTest = data;
      if ((this.listeTest.length)==0) {
        this.full = false
        console.log("okkk")
      }

    })

    
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

  navigateToUrl(url: string) {
    window.open(url, '_blank');
  }

  

}
