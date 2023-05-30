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
  isLoading: boolean = false;
  data: any;
  manual = false
  doneWork = false
  items!: any[];
  preferedTopics!: number[];
  formPrefered !: FormGroup;
  
  listOfTopics = [
    { name: 'Sci/Tech', isChecked: false ,id :1 },
    { name: 'Sports', isChecked: false ,id :6},
    { name: 'Business', isChecked: false ,id :26},
    { name: 'World', isChecked: false ,id :22},
  ]
  listOfTopicsGorcias = [
    { name: 'Sci/Tech', isChecked: false ,id :1,atWork:false,Weekend:false},
    { name: 'Sports', isChecked: false ,id :6,atWork:false,Weekend:false},
    { name: 'Business', isChecked: false ,id :26,atWork:false,Weekend:false},
    { name: 'World', isChecked: false ,id :22,atWork:false,Weekend:false},
  ]
  profil = [
    { work: false, start:'none',finish:'none'},
  ]
  listvals = ['At Work','In the weekend','Both']
  listOfTopicIds = [1,6,26,22]



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
      console.log(this.preferedTopics)

      this.preference.updateTopics(this.preferedTopics).subscribe(data => {
          window.location.href ='/featured'
      },
    (error: HttpErrorResponse) =>
      {
      console.log(error.error)
      
      })
    }
    else {
      this.isLoading = true;
      this.profil[0].start +=':00'
      this.profil[0].finish +=':00'
      console.log(this.profil)
      this.preference.updateProfil(this.profil[0]).subscribe(data =>
        {
          this.preference.storeGorcias(this.listOfTopicsGorcias).subscribe(data => {
            window.location.href ='/featured'
            this.isLoading = false;
        },
        (error: HttpErrorResponse) =>
          {
          console.log(error.error)
            
            })
          
        })

    }
        // Gorcias 
    }

  

  skipHandler() {

    // Call function to disable featured stuff
    window.location.href ='/search-page'

  }

}
