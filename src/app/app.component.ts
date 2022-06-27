import { Component } from '@angular/core';
import { BitcoinDataService } from './bitcoin-data.service';
import { BitcoinCours } from './bitcoin_cours';
import { MesBitcoin } from './mes_bitcoins';
import { MesEuros } from './mes_euros';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private bitcoinService: BitcoinDataService) {}

  mes_bitcoins: MesBitcoin[] = [];
  mes_euros: MesEuros[] = [];
  bitcoins_cours: BitcoinCours[] = [];

  ngOnInit(): void {
    this.getMesBitcoins();
    this.getMesEuros();
    this.getBitcoinCours();

    setInterval(() => {
      this.getMesBitcoins();
      this.getMesEuros();
      this.getBitcoinCours();
    }, 600000);
  }

  getMesBitcoins(): void {
    this.bitcoinService
      .getMesBitcoins()
      .subscribe((mes_bitcoins) => (this.mes_bitcoins = mes_bitcoins));
  }

  getMesEuros(): void {
    this.bitcoinService.getMesEuros().subscribe((mes_euros) => {
      this.mes_euros = mes_euros;
    });
  }

  getBitcoinCours(): void {
    this.bitcoinService.getBitcoinCours().subscribe((bitcoin_cours) => {
      this.bitcoins_cours = bitcoin_cours;
    });
  }
}
