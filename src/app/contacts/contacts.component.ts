import { Component, OnInit } from '@angular/core';

import { ContactsService } from './contacts.service';

@Component({
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit {
  query: string = ''; // search input text
  private contacts: any[] = []; // full list of contacts
  filteredContacts: any[] = []; // list that will be displayed

  constructor(private contactsService: ContactsService) {}

  ngOnInit() {
    this.contactsService.getContacts().subscribe(data => {
      this.contacts = data;
      this.filteredContacts = this.contacts; // display all by default
    }, error => {

      console.log(error.json());

    });
  }

  // Filter all contacts based on query string. Search from names and numbers
  search() {
    this.filteredContacts = this.contacts.filter(contact => {
      return contact.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1 || // case insensitive
             contact.phone.indexOf(this.query) > -1; 
    });
  }

  clearDestination = () => {
    this.query = '';
    this.search();
  }

}