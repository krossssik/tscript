import { of, Observable } from 'rxjs';
import { Contact } from './contact'

export class DataService {
  private data: Array<Contact> = [
    { id: 1, name: 'djon', type: 'men', number: '89193132312' },
    { id: 2, name: 'nik', type: 'men', number: '89329123342' },
    { id: 3, name: 'ana', type: 'women', number: '89235423422' },
    { id: 4, name: 'lena', type: 'women', number: '892365875175' },
    { id: 5, name: 'vlad', type: 'men', number: '89235476233' },
    { id: 6, name: 'gera', type: 'men', number: '89329123342' },
    { id: 7, name: 'mari', type: 'women', number: '892365473264' },
    { id: 8, name: 'den', type: 'men', number: '89273654764' },
    { id: 9, name: 'li', type: 'women', number: '89761547523' },
    { id: 10, name: 'brad', type: 'men', number: '89327687234' },
  ];

  // @ts-ignore
  public getData(): Array<Contact> {
    return this.data;
  }

  public addData(newContact: Contact): void {
    let newUser = new Contact;
    newUser = { ...newContact };
    this.data.push(newUser);
  }

  public deletItem(id: number): void {
    this.data = this.data.filter((pers: any) => {
      if (pers.id === id) {
        return;
      } else return pers;
    });
  }

  public updateData(newContact: Contact): void {
    this.data = this.data.map((pers: any) => {
      if (pers.id === newContact.id) {
        return newContact;
      } else {
        return pers;
      }
    });
  }
}
