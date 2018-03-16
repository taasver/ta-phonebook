import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactsService {

  constructor(private http: Http) {}

  getContacts = (query?: string): Observable<any> => {
    let url = `${process.env.API_URL}/contacts`;
    if (query) { url += `?q=${query}`; }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url, {headers: headers})
           .map(response => response.json());
  }

}