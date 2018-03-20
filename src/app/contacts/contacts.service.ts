import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { Contact } from './contact';

@Injectable()
export class ContactsService {
  private contacts: Contact[]; // cache 

  constructor(private http: Http) {}

  getContacts = (): Observable<any> => {
    let url = `${process.env.API_URL}/contacts?_sort=name`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (this.contacts) { return Observable.of(this.contacts); } // return cached results if its there
    return this.http.get(url, {headers: headers}).map(response => {
      this.contacts = response.json(); // store it in cache
      return this.contacts;
    });
  }

}