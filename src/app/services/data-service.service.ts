import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
import { GloblaDataSummary } from '../models/global-data';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private globalDataUrl ="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/10-29-2020.csv";
  constructor( private http : HttpClient) { }

  getGlobalData(){
     return this.http.get(this.globalDataUrl , {responseType : 'text'}).pipe(
        map(result => {
          let data : GloblaDataSummary[] = [];
          let raw = {};
          let rows = result.split('\n');
          rows.splice(0,1);
          rows.splice(-1,1)
          rows.forEach(row=>{
            let cols = row.split(/,(?=\S)/)
            let cs = {
              country : cols[3],
              confirmed : +cols[7],
              deaths : +cols[8],
              recovered : +cols[9],
              active : +cols[10],
            };
            let temp : GloblaDataSummary = raw[cs.country];
            if(temp){
             temp.active = cs.active + temp.active
             temp.confirmed = cs.confirmed + temp.confirmed
             temp.deaths = cs.deaths + temp.deaths
             temp.active = cs.recovered + temp.recovered
             raw[cs.country] = temp;
            }else{
              raw[cs.country] = cs;
            }
          })
          return <GloblaDataSummary[]>Object.values(raw);
        })
     )
  }
}
