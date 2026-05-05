import { Component } from '@angular/core';
import { ContactCard } from "../../components/contact-card/contact-card";

@Component({
  selector: 'app-contact-list',
  imports: [ContactCard],
  templateUrl: './contact-list.html',
})
export class ContactList { }
