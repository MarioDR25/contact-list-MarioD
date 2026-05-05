import { inject, Injectable, signal } from '@angular/core';
import { Angenda } from './contact.models';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

const URL = 'https://playground.4geeks.com/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactStore {
  private http = inject(HttpClient);
  agenda = signal<Angenda | null>(null);

  resetAgenda() {
    console.log('limpiando');
    
    this.agenda.set({ slug: '', contacts: [] });
    console.log(this.agenda());
    
  }

  createAgenda(name: string) {
    return this.http.post(`${URL}/agendas/${name}`, null);
  }

  getAgenda(name: string) {
    return this.http
      .get<Angenda>(`${URL}/agendas/${name}`)
      .pipe(tap((items) => this.agenda.set(items)),
      tap((items) => console.log(items))
      );
  }

  createContact() {
    this.http.post(`${URL}/agendas/${name}/contacts`, null)
  }


  updateContact() {}

  deleteContact(id: number) {
    const slug = this.agenda()?.slug
    this.http.delete(`${URL}/agendas/${slug}/contacts/${id}`).subscribe({
      next : () => {
        this.agenda.update(current => {
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
