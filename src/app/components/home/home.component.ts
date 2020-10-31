import { Component, OnInit } from '@angular/core';
import { GloblaDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalConfirmed=0;
  totalActive=0;
  totalDeath=0;
  totalRecovered=0;
  globaldata : GloblaDataSummary[];
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
  };
  dashboardTable:GoogleChartInterface = {
    chartType: 'Table',
  };

  constructor(private dataService : DataServiceService) { }

  initChart(){
    let datatable = [];
    let kemoussa = [];
    datatable.push(["Country","Cases"])
    kemoussa.push(["Country","Cases","Death"])
    this.globaldata.forEach(cs=>{
      datatable.push([
        cs.country , cs.confirmed
      ]);
      kemoussa.push([
        cs.country , cs.confirmed , cs.deaths
      ]);
    })
  this.pieChart = {
    chartType:'PieChart',
    dataTable:datatable,
  options: {'title': 'Countries','height':500,'width':1000},
  };
  this.dashboardTable = {
    chartType: 'Table',
    dataTable:kemoussa,
  options: {
      alternatingRowStyle: true,
      showRowNumber : true,
      allowHtml: true,
      'pageSize': 50
      
    },
  };
}
  ngOnInit(): void {
    this.dataService.getGlobalData()
    .subscribe(
      {
        next : (result)=>{
          this.globaldata = result;
          // console.log(result);
          result.forEach(cs=>{
            this.totalActive+=cs.active
            this.totalDeath+=cs.deaths
            this.totalRecovered+=cs.recovered
            this.totalConfirmed+=cs.confirmed
          })
          this.initChart();
        }
      }
      
    )
    }
    
  }
