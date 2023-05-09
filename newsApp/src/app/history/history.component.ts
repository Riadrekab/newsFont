import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  listTest = [1,2,3,4]
  constructor() { }

  ngOnInit(): void {
  }

}
