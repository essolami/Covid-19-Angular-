import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

@Input('totalConfirmed')
totalConfirmed;
@Input('totalDeath')
totalDeath;
@Input('totalActive')
totalActive
@Input('totalRecovered')
totalRecovered

  constructor() { }

  ngOnInit(): void {
  }

}
