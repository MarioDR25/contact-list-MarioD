import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { FormsModule, NgForm } from '@angular/forms';
import { ContactStore } from '../../contact-store';

@Component({
  selector: 'app-contact-form',
  imports: [RouterLink, FormsModule],
  templateUrl: './contact-form.html',
})

// contact-form.ts
export class ContactForm {
  contactStore = inject(ContactStore);
  router = inject(Router);  
  isEditMode = computed(() => !!this.contactStore.contactEdit());

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    if (form.invalid) return;

    if (this.isEditMode()) {
      this.onEditContact(form);
    } else {

      this.onAddContact(form);
    }
  }

   onAddContact(form: NgForm) {
    this.contactStore.createContact(form.value).subscribe({
      next: (res) => {
        this.contactStore.agenda.update((now) => {
          if (!now) return null;
          return { ...now, contacts: [...now.contacts, res] };
        });
        form.reset();
        this.router.navigate(['/my-agenda/contacts']);
      },
      error: (err) => console.error('Error al crear:', err),
    });
  }

   onEditContact(form: NgForm) {
    const contact = this.contactStore.contactEdit();
    if (!contact?.id) return;

    this.contactStore.updateContact(contact.id, form.value).subscribe({
      next: (res) => {
        
        this.contactStore.agenda.update((now) => {
          if (!now) return null;
          return {
            ...now,
            contacts: now.contacts.map((c) =>
              c.id === res.id ? res : c
            ),
          };
        });
        this.contactStore.contactEdit.set(null); 
        this.router.navigate(['/my-agenda/contacts']);
      },
      error: (err) => console.error('Error al editar:', err),
    });
  }



  onCancel() {
    this.contactStore.contactEdit.set(null);
    this.router.navigate(['/my-agenda/contacts']);
}
}
