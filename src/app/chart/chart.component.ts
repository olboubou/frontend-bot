import { MonArgent } from './../mon_argent';
import { Component, Input, OnInit } from '@angular/core';

import { ChartType, ChartConfiguration } from 'chart.js';
import { ViewChild } from '@angular/core';
import { ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  constructor() {}

  @Input()
  mon_argent_list: MonArgent[] = [];

  somme_bitcoins_et_euro: number[] = [];

  tableau_temps_axe_x: any[] = [];

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.calcAxes();
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [1, 2, 3],
        label: 'Bitcoin cours',
      },
      {
        data: [1, 2, 3],
        label: 'Mes euros',
        yAxisID: 'y-axis-1',
      },
      {
        data: [1, 2, 3],
        label: 'Mes bitcoins (x10000)',
        yAxisID: 'y-axis-1',
      },
      {
        data: [1, 2, 3],
        label: 'Bitcoin + euros (€)',
        yAxisID: 'y-axis-1',
        backgroundColor: 'green',
        borderColor: 'green',
        pointBorderColor: 'green'
      },
    ],
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    scales: {
      x: {},
      'y-axis-0': {
        position: 'left',
      },
      'y-axis-1': {
        position: 'right',
      },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public calcAxes(): void {
    for (let i = 0; i < this.mon_argent_list.length; i++)
      this.lineChartData.datasets[0].data[i] = this.mon_argent_list[i].bitcoin_cours;

    for (let i = 0; i < this.mon_argent_list.length; i++)
      this.lineChartData.datasets[1].data[i] = this.mon_argent_list[i].mes_euros;

    for (let i = 0; i < this.mon_argent_list.length; i++)
      this.lineChartData.datasets[2].data[i] =
        this.mon_argent_list[i].mes_bitcoins * 10000;

    this.lineChartData.datasets[0].data.reverse();
    this.lineChartData.datasets[1].data.reverse();
    this.lineChartData.datasets[2].data.reverse();

    let bitcoin_en_euro = this.mon_argent_list.reverse().map((elem, index) => elem.mes_bitcoins * this.mon_argent_list[index].bitcoin_cours)
    let mon_argent_tab = this.mon_argent_list.reverse()
    this.somme_bitcoins_et_euro = bitcoin_en_euro.map(function (num, idx) {
      return num + mon_argent_tab[idx].mes_euros });

    this.lineChartData.datasets[3].data = this.somme_bitcoins_et_euro;  

    this.lineChartData.labels = this.mon_argent_list
      .map(
        (btc) =>
          new Date(btc.date).getHours() + ':' + new Date(btc.date).getMinutes()
      )
      .reverse();

    this.chart?.update();
  }
}
