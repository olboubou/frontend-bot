import { Component, Input, OnInit } from '@angular/core';

import { ChartType, ChartConfiguration } from 'chart.js';
import { ViewChild } from '@angular/core';
import { ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MesBitcoin } from '../mes_bitcoins';
import { MesEuros } from '../mes_euros';
import { BitcoinCours } from '../bitcoin_cours';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  constructor() {}

  @Input()
  mes_bitcoins: MesBitcoin[] = [];
  @Input()
  mes_euros: MesEuros[] = [];
  @Input()
  bitcoins_cours: BitcoinCours[] = [];

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
    labels: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6],
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
    for (let i = 0; i < this.bitcoins_cours.length; i++)
      this.lineChartData.datasets[0].data[i] = this.bitcoins_cours[i].valeur;

    for (let i = 0; i < this.mes_euros.length; i++)
      this.lineChartData.datasets[1].data[i] = this.mes_euros[i].quantite;

    for (let i = 0; i < this.mes_bitcoins.length; i++)
      this.lineChartData.datasets[2].data[i] =
        this.mes_bitcoins[i].quantite * 10000;

    this.lineChartData.datasets[0].data.reverse();
    this.lineChartData.datasets[1].data.reverse();
    this.lineChartData.datasets[2].data.reverse();

    let bitcoin_en_euro = this.mes_bitcoins.reverse().map(elem => elem.quantite * this.bitcoins_cours[0].valeur)
    let mes_euro_tab = this.mes_euros.reverse()
    this.somme_bitcoins_et_euro = bitcoin_en_euro.map(function (num, idx) {
      return num + mes_euro_tab[idx].quantite });

    this.lineChartData.datasets[3].data = this.somme_bitcoins_et_euro;  
    console.log(this.somme_bitcoins_et_euro)

    this.lineChartData.labels = this.bitcoins_cours
      .map(
        (btc) =>
          new Date(btc.date).getHours() + ':' + new Date(btc.date).getMinutes()
      )
      .reverse();

    this.chart?.update();
  }
}
