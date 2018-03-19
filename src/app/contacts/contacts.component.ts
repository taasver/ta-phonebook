import { Component, OnInit } from '@angular/core';

import { ContactsService } from './contacts.service';
import { Contact } from './contact';

@Component({
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit {
  query: string = ''; // search input text
  private contacts: Contact[] = []; // full list of contacts
  filteredContacts: Contact[] = []; // list that will be displayed
  isLoading: boolean = true;
  isError: boolean = false;

  constructor(private contactsService: ContactsService) {}

  ngOnInit() {
    this.contactsService.getContacts().subscribe(data => {
      this.isLoading = false;
      this.contacts = data;
      this.filteredContacts = this.contacts; // display all by default
    }, error => {
      this.isLoading = false;
      this.isError = true;
    });
  }

  // Filter all contacts based on query string. Search from names and numbers
  search() {
    this.filteredContacts = this.contacts.filter((contact: Contact) => {
      return contact.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1 || // case insensitive
             contact.phone.indexOf(this.query) > -1; 
    });
  }

  clearQuery = () => {
    this.query = '';
    this.search();
  }

}