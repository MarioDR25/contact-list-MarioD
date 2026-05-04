import { Routes } from '@angular/router';
import { ContactList } from './contacts/pages/contact-list/contact-list';
import { ContactForm } from './contacts/pages/contact-form/contact-form';

export const routes: Routes = [
    {
        path: 'contact',
        component : ContactList
    },
    {
        path: 'form',
        component : ContactForm
    },
];
