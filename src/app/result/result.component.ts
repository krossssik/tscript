import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Contact } from '../contact'

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  providers: [DataService]
})
export class ResultComponent implements OnInit {
  public searchForm: FormGroup;
  private searchFormSubscription: Subscription;

  public searchContact = new Contact();
  public data: Array<Contact>;
  public selectedId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataService: DataService,
  ) {
    this.searchForm = this.initForm();
  }

  ngOnInit() {
    this.searchFormSubscription = this.searchForm.valueChanges
      .pipe(
        debounceTime(200)
      )
      .subscribe((value) => {
        this.searchContact = { ...value };
      });

    this.getData();
  }

  public filter(): void {
    let { name, type, number } = this.searchContact;

    this.data = this.dataService.getData().filter((pers: any) => {
      console.log(pers);

      if (pers.type.indexOf(type) + 1 && pers.name.indexOf(name) + 1 && pers.number.indexOf(number) + 1) {
        return pers;
      }
    });

    this.setValueForForm('', '', '');
  }

  private getData(): void {
    this.data = this.dataService.getData();
  }

  public addContact(): void {
    const newContact = this.createContact();
    console.log('new', newContact);

    this.dataService.addData(newContact);
    this.getData();
    this.setValueForForm('', '', '');
  }

  public createContact(id?: number): Contact {
    let newContact = new Contact;
    newContact.id = id ? id : this.data[this.data.length - 1].id + 1;
    newContact.name = this.searchContact.name;
    newContact.type = this.searchContact.type;
    newContact.number = this.searchContact.number;
    return newContact;
  }

  public delete(ev: Contact): void {
    this.dataService.deletItem(ev.id);
    this.getData();
  }

  public update(ev: Contact): void {
    this.selectedId = ev.id;
    this.setValueForForm(ev.name, ev.type, ev.number);
  }

  public setValueForForm(name: string, type: string, number: string): void {
    this.searchForm.controls['name'].patchValue(name);
    this.searchForm.controls['type'].patchValue(type);
    this.searchForm.controls['number'].patchValue(number);
  }

  public save(): void {
    const newContact = this.createContact(this.selectedId);
    this.dataService.updateData(newContact);
    this.getData();
    this.selectedId = null;
    this.setValueForForm('', '', '');
  }

  private initForm(): FormGroup {
    const form: FormGroup = this.fb.group({
      name: this.fb.control(''),
      type: this.fb.control(''),
      number: this.fb.control(''),
    });
    return form;
  }
}
