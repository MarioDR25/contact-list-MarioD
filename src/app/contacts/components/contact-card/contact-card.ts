import { Component, Input, input, output } from '@angular/core';
import { required } from '@angular/forms/signals';
import { Contact } from '../../contact.models';

@Component({
  selector: 'app-contact-card',
  imports: [],
  templateUrl: './contact-card.html',
})
export class ContactCard {
  contacts = input.required<Contact[]>()
  
  onRemoveContact = output<number>();

  onRemove(id: number) {
    console.log('Envié el id ', id);
    
    this.onRemoveContact.emit(id)
  }

  onEdit(id: number) {} 
}
