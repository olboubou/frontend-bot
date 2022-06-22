import { Component } from '@angular/core';
import { Bitcoin } from './bitcoin';
import { BitcoinDataService } from './bitcoin-data.service';
import { MonArgent } from './monargent';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private bitcoinService: BitcoinDataService) { }

  bitcoinPrixListe: Bitcoin[] = [];
  monargentListe: MonArgent[] = [];

  ngOnInit(): void {
    this.getBitcoinPrix();
    this.getMonArgent();

  }

  getBitcoinPrix(): void {
    this.bitcoinService.getBitcoinPrice()
    .subscribe(bitcoinPrixListe => this.bitcoinPrixListe = bitcoinPrixListe);
  }

  getMonArgent(): void {
    this.bitcoinService.getMonArgent()
    .subscribe(monargentListe => {
      console.log(monargentListe)
      this.monargentListe = monargentListe
    });
  }


  

}
