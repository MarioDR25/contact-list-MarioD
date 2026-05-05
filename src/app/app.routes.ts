import { Routes } from '@angular/router';
import { ContactList } from './contacts/pages/contact-list/contact-list';
import { ContactForm } from './contacts/pages/contact-form/contact-form';
import { AgendaSetup } from './contacts/pages/agenda-setup/agenda-setup';
import { Dashboard } from './contacts/pages/dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'my-agenda',
    component: Dashboard,
    children: [
      { path: '', component: AgendaSetup },
      { path: 'contacts', component: ContactList },
      { path: 'contacts/form', component: ContactForm },
    ],
  },
  { path: '', redirectTo: '/my-agenda', pathMatch: 'full' },
];
