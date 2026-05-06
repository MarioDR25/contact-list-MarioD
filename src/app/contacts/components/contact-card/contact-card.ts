import { Component, inject, input, output } from '@angular/core';
import { Contact } from '../../contact.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-card',
  imports: [],
  templateUrl: './contact-card.html',
})
export class ContactCard {
  isOpen = false;
  itemToDelete: number | null = null;
  contact = input.required<Contact>();
  onRemoveContact = output<number>();
  onEditContact = output<Contact>();


 private router = inject(Router);
  
 onEdit(contact: Contact) {
     this.onEditContact.emit(contact)
     this.router.navigate(['/my-agenda/contacts/form']);
 }

 onRemove(id: number ) {
    this.itemToDelete = id;
    this.isOpen = true;
  }


  close() {
    this.isOpen = false;
    this.itemToDelete = null;
  }

  confirmDelete() {
    if (this.itemToDelete) {
      console.log('Eliminando:', this.itemToDelete);
      this.onRemoveContact.emit(this.itemToDelete);
    }
    this.close();
  }

}
