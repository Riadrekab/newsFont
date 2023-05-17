import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-preferences',
  templateUrl: './register-preferences.component.html',
  styleUrls: ['./register-preferences.component.css']
})
export class RegisterPreferencesComponent implements OnInit {

  manual = false
  constructor() { }

  ngOnInit(): void {
  }

}
