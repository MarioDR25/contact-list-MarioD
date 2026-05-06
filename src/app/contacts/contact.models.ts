export interface Agenda {
  slug: string;
  contacts: Contact[] | [];
}

export interface Contact {
  name: string;
  phone: string;
  email: string;
  address: string;
  id: number;
}


export interface AgendaResponse {
  slug: string;
  id:   number;
}
