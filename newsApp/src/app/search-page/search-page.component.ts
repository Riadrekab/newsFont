import { Component, OnInit } from '@angular/core';
import { NewsServiceService } from '../news-service.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  search = false
  listeTest = [1,2,3,4]
  constructor( private newsService : NewsServiceService) { }

  ngOnInit(): void {

    // TESTING the API Call
      // this.newsService.getNews().subscribe(data=>{
      //   console.log(data)
      // })
    
  }

  // getNews () {
  //   this.newsService.getNews().subscribe(data=>{
  //     console.log(data)
  //   })
  // }
}
