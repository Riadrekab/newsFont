import { Component, Inject, OnInit } from '@angular/core';
import { PreferecesService } from '../prefereces.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})


export class FeaturedComponent implements OnInit {
  listeTest = []
  full = true


  constructor(private preferenceService: PreferecesService,@Inject(DOCUMENT) private document: Document, private authService : AuthService) {}

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
    this.preferenceService.getPrefered().subscribe(data => {
        let vals =JSON.parse(data.toString())
        this.listeTest = vals
        if ((this.listeTest.length)==0) {
          this.full = false
        }
    })
  }

  navigateToUrl(url: string) {
    window.open(url, '_blank');
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
