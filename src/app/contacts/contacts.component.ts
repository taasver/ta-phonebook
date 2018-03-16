import { Component, OnInit } from '@angular/core';

import { ContactsService } from './contacts.service';

@Component({
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit {
  query: string = ''; // search input text
  contacts: any[] = [];

  constructor(private contactsService: ContactsService) {}

  ngOnInit() {
    this.search();
  }

  search() {
    this.contactsService.getContacts(this.query).subscribe(data => {

      this.contacts = data;

    }, error => {

      console.log(error.json());

    });
  }

}