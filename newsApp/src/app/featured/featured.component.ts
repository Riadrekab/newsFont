import { Component, OnInit } from '@angular/core';
import { PreferecesService } from '../prefereces.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {

  constructor(private preferenceService: PreferecesService) {}

  ngOnInit(): void {
    this.preferenceService.checkTopics().subscribe(data => {
      console.log(data)
    })
  }


}
