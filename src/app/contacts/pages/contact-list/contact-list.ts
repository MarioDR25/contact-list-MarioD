import { Component, inject } from '@angular/core';
import { ContactCard } from "../../components/contact-card/contact-card";
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { ContactStore } from '../../contact-store';


@Component({
  selector: 'app-contact-list',
  imports: [ContactCard, RouterLink],
  templateUrl: './contact-list.html',
})
export class ContactList { 
  contactStore = inject(ContactStore)
   private router = inject(Router);
  
  onExit() {
    this.contactStore.resetAgenda()
    this.router.navigate(['/my-agenda']);
  }

 

  onDeleteContact(id: number) { 
    console.log('recibí el id ', id);
    this.contactStore.deleteContact(id)
  }
}
