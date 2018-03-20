import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }  from './app.component';
import { ContactsComponent }  from './contacts/contacts.component';
import { ContactsService } from './contacts/contacts.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ ContactsService ],
  declarations: [
    AppComponent,
    ContactsComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}