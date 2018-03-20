import { Http, Headers, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

import { ContactsService } from './contacts.service';

describe('ContactsService', () => {

  let service: ContactsService;
  let spy: jasmine.Spy;

  beforeEach(() => {
    const http = new Http(new MockBackend(), new BaseRequestOptions());
    spy = spyOn(http, 'get').and.returnValue(
      Observable.of(new Response(new ResponseOptions({
        body: JSON.stringify({})
      })))
    );
    service = new ContactsService(http);
  });

  it('should call the backend on getContacts call and cache the results', done => {
    service.getContacts().subscribe(() => {
      expect(spy.calls.count()).toBe(1);
      expect(spy.calls.first().args[0]).toBe('http://test.test/contacts?_sort=name');
      service.getContacts().subscribe(() => {
        expect(spy.calls.count()).toBe(1);
        done();
      });        
    });
  });

});