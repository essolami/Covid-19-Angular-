import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { GloblaDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  data : GloblaDataSummary[];
  countries : string[] = [];
  totalConfirmed=0;
  totalActive=0;
  totalDeath=0;
  totalRecovered=0;
  constructor(private service :DataServiceService) { }

  ngOnInit(): void {
    this.service.getGlobalData().subscribe(result=>{
      this.data=result;
      this.data.forEach(cs=>{
        this.countries.push(cs.country);
        if(cs.country == 'Afghanistan'){
          this.totalActive=cs.active;
        this.totalDeath=cs.deaths;
        this.totalRecovered=cs.recovered;
        this.totalConfirmed=cs.confirmed;
        }
      })
    })
    
  }
  updateValues(country :string){
    // console.log(country)
    this.data.forEach(cs=>{
      if(cs.country== country){
        this.totalActive=cs.active;
        this.totalDeath=cs.deaths;
        this.totalRecovered=cs.recovered;
        this.totalConfirmed=cs.confirmed;
      }
    })
  }


}
