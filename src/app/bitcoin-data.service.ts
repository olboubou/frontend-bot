import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { MesBitcoin } from './mes_bitcoins';
import { MesEuros } from './mes_euros';
import { BitcoinCours } from './bitcoin_cours';

@Injectable({
  providedIn: 'root',
})
@Injectable({ providedIn: 'root' })
export class BitcoinDataService {
  private mes_bitcoinUrl = environment.mes_bitcoinUrl; // URL to web api
  private mes_eurosUrl = environment.mes_eurosUrl; // URL to web api
  private bitcoin_coursUrl = environment.bitcoin_coursUrl; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getMesBitcoins(): Observable<MesBitcoin[]> {
    return this.http.get<MesBitcoin[]>(this.mes_bitcoinUrl);
  }

  getMesEuros(): Observable<MesEuros[]> {
    return this.http.get<MesEuros[]>(this.mes_eurosUrl);
  }

  getBitcoinCours(): Observable<BitcoinCours[]> {
    return this.http.get<BitcoinCours[]>(this.bitcoin_coursUrl);
  }

  addBitcoin(bitcoin: MesBitcoin): Observable<MesBitcoin> {
    return this.http.post<MesBitcoin>(
      this.mes_bitcoinUrl,
      bitcoin,
      this.httpOptions
    );
  }

  addEuro(euros: MesEuros): Observable<MesEuros> {
    return this.http.post<MesEuros>(this.mes_eurosUrl, euros, this.httpOptions);
  }
}
