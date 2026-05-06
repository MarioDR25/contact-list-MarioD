import { inject, Injectable, signal } from '@angular/core';
import { AgendaResponse, Agenda, Contact } from './contact.models';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const URL = 'https://playground.4geeks.com/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactStore {
  private http = inject(HttpClient);
  agenda = signal<Agenda | null>(null);
  contactEdit = signal<Contact | null>(null)

  resetAgenda() {
    this.agenda.set({ slug: '', contacts: [] });
    console.log(' me ejecute limpiando ', this.agenda());
  }

  resetForCreate() {
    this.contactEdit.set({ name: '', phone: '', email: '', address: '' } as Contact);
  }

  createAgenda(name: string): Observable<AgendaResponse> {
    return this.http.post<AgendaResponse>(`${URL}/agendas/${name}`, null);
  }
  
  getAgenda(name: string): Observable<Agenda> {
    return this.http
      .get<Agenda>(`${URL}/agendas/${name}`)
      .pipe<Agenda>(tap<Agenda>((items) => this.agenda.set(items)));
  }

  createContact(form : Omit<Contact, 'id'>): Observable<Contact> {
    return this.http.post<Contact>(`${URL}/agendas/${this.agenda()?.slug}/contacts`, form)

  }
  


  // contact.service.ts
  updateContact(id: number, contact: Omit<Contact, 'id'>): Observable<Contact> {
    return this.http.put<Contact>(`${URL}/agendas/${this.agenda()?.slug}/contacts/${id}`, contact);
  }


  deleteContact(id: number): Observable<string>{
    const slug = this.agenda()?.slug
    return this.http.delete<string>(`${URL}/agendas/${slug}/contacts/${id}`)
  }
}
