import { Component, OnInit } from '@angular/core';
import { NewsServiceService } from '../news-service.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  search = false
  listeTest = []
  constructor( private newsService : NewsServiceService) { }

  ngOnInit(): void {

    // TESTING the API Call
      // this.newsService.getNews().subscribe(data=>{
      //   console.log(data)
      // })
    
  }

  goClick() {
  this.search = true
  this.getNews()
  }

  getNews () {
    this.newsService.getNews().subscribe(data=>{
    let vals =JSON.parse(data.toString())
    this.listeTest = vals
    console.log(this.listeTest)

    })
  
  }
  navigateToUrl(url: string) {
    window.open(url, '_blank');
  }
}
