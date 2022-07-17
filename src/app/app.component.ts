import { MonArgent } from './mon_argent';
import { Component } from '@angular/core';
import { BitcoinDataService } from './bitcoin-data.service';
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

  mon_argent_list: MonArgent[] = [];
  bitcoins_achetees: number = 0;
  bitcoin_cours = 0

  ngOnInit(): void {
    this.reload_data();

    setInterval(() => {
      this.reload_data();
    }, 600000);
  }

  private reload_data() {
    setTimeout(() => {
      this.getMonArgent()
    }, 2000);
  }

  getMonArgent(): void {
    this.bitcoinService
      .getMonArgentList()
      .subscribe((mon_argent) => (this.mon_argent_list = mon_argent));
  }

  transaction(bitcoins_achetees: number) {
    let mes_argent_a_envoyer: MonArgent = {
      mes_euros: this.mon_argent_list[0].mes_euros - this.convert_bitcoins_to_euros(bitcoins_achetees),
      mes_bitcoins: this.mon_argent_list[0].mes_bitcoins + bitcoins_achetees,
      bitcoin_cours: this.mon_argent_list[0].bitcoin_cours,
      date: new Date(
        new Date(new Date().getTime() - new Date().getTimezoneOffset() * 120000)
          .toISOString()
          .slice(0, 19)
          .replace('T', ' ')
      ),
      
    };
    this.bitcoinService.add_transaction(mes_argent_a_envoyer).subscribe((argent) => {
      argent;
    });
    this.showSuccess(
      'Vous avez acheté : ' + 
      bitcoins_achetees + ' ₿' + ' pour : ' +
      this.convert_bitcoins_to_euros(bitcoins_achetees) + ' €'
    );
    this.reload_data();
  }

  convert_bitcoins_to_euros(quantite_bitcoin: number) {
   if (this.mon_argent_list[0].bitcoin_cours) {
      return this.mon_argent_list[0].bitcoin_cours * quantite_bitcoin;
    }  
    else return 0
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }
  
}
