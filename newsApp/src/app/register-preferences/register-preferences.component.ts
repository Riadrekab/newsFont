import { Component, OnInit } from '@angular/core';
import { PreferecesService } from '../prefereces.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-preferences',
  templateUrl: './register-preferences.component.html',
  styleUrls: ['./register-preferences.component.css']
})
export class RegisterPreferencesComponent implements OnInit {

  manual = false
  items!: any[];
  preferedTopics!: number[];
  listOfTopics = [
    { name: 'Technology', isChecked: false,id :12 },
    { name: 'Sports', isChecked: false ,id :11},
    { name: 'Gaming', isChecked: false,id :5 },
    { name: 'Music', isChecked: false ,id :3},
    { name: 'Careers', isChecked: false,id :14 },
    { name: 'Entertainment', isChecked: false,id :1},
  ]
  listOfTopicIds = [12,11,5,3,14,1]



  constructor(private preference : PreferecesService) { }

  ngOnInit(): void {
    this.preference.checkTopicsGen().subscribe(data=>{
      console.log(data)
    })
  }

  updatePreferedTopics() {
    this.preferedTopics = this.listOfTopics
      .filter(item => item.isChecked)
      .map(item => item.id);
  }
  formHandler() {
    if(this.manual) {
      this.updatePreferedTopics()
      console.log(this.preferedTopics)
    } 
    else {
      // Gorcias 
    }

  }

  skipHandler() {

    // Call function to disable featured stuff
    window.location.href ='/search-page'

  }

}
