import { Component, OnInit } from '@angular/core';
import { PreferecesService } from '../prefereces.service';

@Component({
  selector: 'app-register-preferences',
  templateUrl: './register-preferences.component.html',
  styleUrls: ['./register-preferences.component.css']
})
export class RegisterPreferencesComponent implements OnInit {

  manual = false
  items!: any[];
  listOfTopics = ['Technology','Sports','Gaming','Music','Careers','Entertainment']
  listOfTopicIds = [12,11,5,3,14,1]

  constructor(private preference : PreferecesService) { }

  ngOnInit(): void {
    this.preference.checkTopicsGen().subscribe(data=>{
      console.log(data)
    })
  }

}
