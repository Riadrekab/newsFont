import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NewsServiceService } from '../news-service.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  listTest = []
  constructor(@Inject(DOCUMENT) private document: Document, private authService : AuthService,private newsService : NewsServiceService) { }

  ngOnInit(): void {
    this.newsService.preds().subscribe(data=>{
      console.log(data)
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
    this.newsService.getHistory().subscribe(data => {
      this.listTest = (data as any)
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

}
