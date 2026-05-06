import { Component, computed, inject, signal } from '@angular/core';
import { ContactStore } from '../../contact-store';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-agenda-setup',
  imports: [],
  templateUrl: './agenda-setup.html',
})
export class AgendaSetup {
  contactStore = inject(ContactStore);
  private router = inject(Router);

  agendaData = signal<string>('');
  isFormReady = computed<boolean>(() => this.agendaData().trim().length === 0);

  updateName(nameInp: string) {
    console.log(nameInp);
    this.agendaData.set(nameInp);
  }


  onStart() {
    const name = this.agendaData();

    this.contactStore.getAgenda(name).pipe(
        catchError((error) => {

          if (error.status === 404) {
            console.warn('Agenda no encontrada, creando...');
            return this.contactStore.createAgenda(name)
            .pipe(
              tap(() => this.contactStore.resetAgenda()),
            );
          }
          throw error;
        }),
      )
      .subscribe({
        next: () => {
          console.log('Todo listo, navegando... ', this.contactStore.agenda());
          this.router.navigate(['my-agenda/contacts']);
        },
        error: (err) => console.error('Error definitivo:', err),
      });
  }
}
