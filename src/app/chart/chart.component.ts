import { Component, OnInit } from '@angular/core';

import { ChartType, ChartConfiguration } from 'chart.js';
import { ViewChild } from '@angular/core';
import {  ChartEvent,  } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 60000, 59000, 50000, 40000, 30000, 28000, 33000 ],
        label: 'Bitcoin',
      },
      
      {
        data: [ 180, 200, 220, 250, 300, 400, 800 ],
        label: 'Mon argent',
        yAxisID: 'y-axis-1',
      }
    ],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
  
    scales: {
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        
      }
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

}
