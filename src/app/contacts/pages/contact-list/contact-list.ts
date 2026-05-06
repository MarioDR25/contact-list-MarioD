import { Component, inject } from '@angular/core';
import { ContactCard } from '../../components/contact-card/contact-card';
import { Router, RouterLink } from '@angular/router';
import { ContactStore } from '../../contact-store';
import { NgFor } from '@angular/common';
import { Contact } from '../../contact.models';

@Component({
  selector: 'app-contact-list',
  imports: [ContactCard, RouterLink],
  templateUrl: './contact-list.html',
})
export class ContactList {
  contactStore = inject(ContactStore);
  private router = inject(Router);


  onExit() {
    this.contactStore.resetAgenda();
    this.router.navigate(['/my-agenda']);
  }

  onEditContact(contact : Contact){
    this.contactStore.contactEdit.set(contact)
    console.log('guarde este a editar', contact);
    
  }

  onDeleteContact(id: number) {
    console.log('recibí el id ', id);
    this.contactStore.deleteContact(id).subscribe({
      next : () => {
        this.contactStore.agenda.update(current => {
          if(!current) return null;
          return {
            ...current, 
            contacts: current.contacts.filter(c => c.id != id)
          }
        })
      },
      error : (error) => console.error('Error al borrar', error )
    })
  }
}
