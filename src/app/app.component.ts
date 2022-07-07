import { Component } from '@angular/core';
import { BitcoinDataService } from './bitcoin-data.service';
import { BitcoinCours } from './bitcoin_cours';
import { MesBitcoin } from './mes_bitcoins';
import { MesEuros } from './mes_euros';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private bitcoinService: BitcoinDataService,
    private toastr: ToastrService
  ) {}

  mes_bitcoins: MesBitcoin[] = [];
  mes_euros: MesEuros[] = [];
  bitcoins_cours: BitcoinCours[] = [];

  euros_a_convertir: number = 0;
  bitcoins_a_convertir: number = 0;

  ngOnInit(): void {
    this.reload_data();

    setInterval(() => {
      this.reload_data();
    }, 600000);
  }

  private reload_data() {
    setTimeout(() => {
      this.getMesBitcoins();
      this.getMesEuros();
      this.getBitcoinCours();
    }, 2000);
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

  convert_euros_to_bitcoins(quantite_euros: number) {
    if (this.bitcoins_cours[0].valeur)
      return quantite_euros / this.bitcoins_cours[0].valeur;
    else return 0
  }

  convert_bitcoins_to_euros(quantite_bitcoin: number) {
   if (this.bitcoins_cours[0].valeur)
      return this.bitcoins_cours[0].valeur * quantite_bitcoin;
    else return 0  
  }

  acheter_bitcoins(quantite_euros: number) {
    let mes_euros_a_envoyer: MesEuros = {
      date: new Date(
        new Date(new Date().getTime() - new Date().getTimezoneOffset() * 120000)
          .toISOString()
          .slice(0, 19)
          .replace('T', ' ')
      ),
      monnaie: 'euros',
      quantite: quantite_euros,
    };
    this.bitcoinService.addEuro(mes_euros_a_envoyer).subscribe((eur) => {
      eur;
    });
    this.showSuccess(
      'Vous avez acheté : ' +
        this.convert_euros_to_bitcoins(quantite_euros) +
        ' bitcoins pour : ' +
        quantite_euros +
        '€'
    );
    this.reload_data();
  }

  vendre_bitcoins(quantite_bitcoin: number) {
    let mes_bitcoins_a_envoyer: MesBitcoin = {
      date: new Date(
        new Date(new Date().getTime() - new Date().getTimezoneOffset() * 120000)
          .toISOString()
          .slice(0, 19)
          .replace('T', ' ')
      ),
      monnaie: 'bitcoins',
      quantite: quantite_bitcoin,
    };
    this.bitcoinService.addBitcoin(mes_bitcoins_a_envoyer).subscribe((btc) => {
      btc;
    });
    this.showSuccess(
      'Vous avez vendu : ' +
        quantite_bitcoin +
        ' bitcoins pour : ' +
        this.convert_bitcoins_to_euros(quantite_bitcoin) +
        '€'
    );
    this.reload_data();
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }
}
