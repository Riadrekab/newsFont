import { Component, OnInit } from '@angular/core';
import { PreferecesService } from '../prefereces.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})


export class FeaturedComponent implements OnInit {
  listeTest = []
  full = true


  constructor(private preferenceService: PreferecesService) {}

  ngOnInit(): void {
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


}
