import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Bitcoin } from './bitcoin';
import { MonArgent } from './monargent';
import { environment } from './../environments/environment';


@Injectable({
  providedIn: 'root'
})


@Injectable({ providedIn: 'root' })
export class BitcoinDataService {


  private bitcoinUrl = environment.bitcoinUrl  // URL to web api
  private monargentUrl = environment.monargentUrl;  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,) { }

  getBitcoinPrice(): Observable<Bitcoin[]> {
    return this.http.get<Bitcoin[]>(this.bitcoinUrl)
  }

  getMonArgent(): Observable<MonArgent[]> {
    return this.http.get<MonArgent[]>(this.monargentUrl)
  }

}
