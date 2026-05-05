export interface Angenda {
    slug:     string;
    contacts: Contact[] ;
}

export interface Contact {
    name:    string;
    phone:   string;
    email:   string;
    address: string;
    id:      number;
}


export interface AgendaState {
  name: string;
  mode: string; 
}