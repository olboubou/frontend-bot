import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { MonArgent } from './mon_argent';

@Injectable({
  providedIn: 'root',
})
@Injectable({ providedIn: 'root' })
export class BitcoinDataService {
  
  private mon_argent_url = environment.mon_argent_url; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getMonArgentList(): Observable<MonArgent[]> {
    return this.http.get<MonArgent[]>(this.mon_argent_url);
  }

  add_transaction(argent: MonArgent): Observable<MonArgent> {
    return this.http.post<MonArgent>(
      this.mon_argent_url,
      argent,
      this.httpOptions
    );
  }
}
