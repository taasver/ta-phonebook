import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { FormsModule }  from '@angular/forms';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ContactsComponent } from './contacts.component';
import { ContactsService }   from './contacts.service';

let comp: ContactsComponent;
let fixture: ComponentFixture<ContactsComponent>;
let spy: jasmine.Spy;
let searchInput: HTMLInputElement;

const TEST_CONTACTS: any = [
  { name: 'Michael Knight', photo: 'https://test.test/c1.jpg', phone: '450-3232-223-44' },
  { name: 'Hannibal Smith', photo: 'https://test.test/c2.jpg', phone: '342-234-840' },
  { name: 'B. A. Baracus',  photo: 'https://test.test/c3.jpg', phone: '342-234-841' }
];

// helper
class ContactsServiceStub {
  getContacts() { return Observable.of(TEST_CONTACTS); }
}

describe('ContactsComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ ContactsComponent ],
      providers: [ {provide: ContactsService, useClass: ContactsServiceStub} ]
    });
    fixture = TestBed.createComponent(ContactsComponent);
    comp    = fixture.componentInstance;
    spy = spyOn(fixture.debugElement.injector.get(ContactsService), 'getContacts').and.callThrough();
    searchInput = fixture.debugElement.query(By.css('#contacts-query')).nativeElement;
    fixture.detectChanges();
  });

  it('should work', () => {
    expect(comp instanceof ContactsComponent).toBe(true);
  });

  it('should load the products', () => {
    expect(spy.calls.count()).toBe(1);
    expect(comp.isLoading).toBe(false);
    expect(comp.filteredContacts).toEqual(TEST_CONTACTS);
  });

  it('should display the list of contacts', () => {
    expect(spy.calls.count()).toBe(1);
    expect(comp.isLoading).toBe(false);
    expect(comp.filteredContacts).toEqual(TEST_CONTACTS);
  });

  it('should display the photo and name of the contact', () => {
    let contact = fixture.debugElement.query(By.css('.contact'));
    let photo = contact.query(By.css('.contact__photo')).nativeElement;
    let text = contact.query(By.css('.contact__text')).nativeElement;
    expect(photo.style.backgroundImage).toContain(TEST_CONTACTS[0].photo);
    expect(text.textContent).toContain(TEST_CONTACTS[0].name);
  });

  it('should find a contact when searching by name (lowercase) and display the result count', () => {
    expect(comp.query).toBe('');
    searchInput.value = 'knight';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    let contacts = fixture.debugElement.queryAll(By.css('.contact'));
    let count = fixture.debugElement.query(By.css('.contacts-page > div')).nativeElement;
    expect(comp.query).toBe('knight');
    expect(comp.filteredContacts).toEqual([TEST_CONTACTS[0]]); // check contacts in component
    expect(contacts.length).toBe(1); // check rendered contacts
    expect(count.textContent).toContain('Found 1 contact');
  });

  it('should find a contact when searching by phone', () => {
    searchInput.value = '342-234-840';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    let contacts = fixture.debugElement.queryAll(By.css('.contact'));
    expect(comp.filteredContacts).toEqual([TEST_CONTACTS[1]]); // check contacts in component
    expect(contacts.length).toBe(1); // check rendered contacts
  });

  it('should find no items when searching without matches for the query', () => {
    searchInput.value = 'trolololo';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    let contacts = fixture.debugElement.queryAll(By.css('.contact'));
    expect(comp.filteredContacts).toEqual([]); // check contacts in component
    expect(contacts.length).toBe(0); // check rendered contacts
  });

  it('should clear search query when clear button clicked', () => {
    searchInput.value = 'knight';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(comp.query).toBe('knight');
    let clearBtn = fixture.debugElement.query(By.css('.input-simple__clear')).nativeElement;
    clearBtn.click();
    expect(comp.query).toBe('');
  });

});