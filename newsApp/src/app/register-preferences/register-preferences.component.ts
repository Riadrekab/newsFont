import { Component, OnInit } from '@angular/core';
import { PreferecesService } from '../prefereces.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-preferences',
  templateUrl: './register-preferences.component.html',
  styleUrls: ['./register-preferences.component.css']
})
export class RegisterPreferencesComponent implements OnInit {

  manual = false
  items!: any[];
  preferedTopics!: number[];
  formPrefered !: FormGroup;
  listOfTopics = [
    { name: 'Technology', isChecked: false,id :12 },
    { name: 'Sports', isChecked: false ,id :11},
    { name: 'Gaming', isChecked: false,id :5 },
    { name: 'Music', isChecked: false ,id :3},
    { name: 'Careers', isChecked: false,id :14 },
    { name: 'Entertainment', isChecked: false,id :1},
  ]
  listOfTopicIds = [12,11,5,3,14,1]



  constructor(private preference : PreferecesService,private formBuilder: FormBuilder) { 
    this.formPrefered = this.formBuilder.group({
      preferred_topics : []
    })
  }

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
      this.preference.updateTopics(this.preferedTopics).subscribe(data => {
          console.log(data)
          window.location.href ='/featured'
      },
    (error: HttpErrorResponse) =>
      {
      console.log(error.error)
      
      })
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
