import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SignService } from '../sign.service'

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css'],
  providers: [SignService],
})
export class SignComponent implements OnInit {
  public signForm: FormGroup;

  public Name: string;
  public Pass: string;
  public valid: boolean = false;

  private searchFormSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signService: SignService,
  ) {
    this.signForm = this.initForm();
  }

  ngOnInit() {
    this.searchFormSubscription = this.signForm.valueChanges
      .pipe(
        debounceTime(200)
      )
      .subscribe((value) => {
        const { Name, Pass } = value;
        this.Name = Name;
        this.Pass = Pass;
      });
  }

  public sign(): void {
    const val: boolean = this.signService.cheskUser(this.Name, this.Pass);
    console.log('val', val);
    if (val) {
      this.router.navigate(['/contact']);
    } else {
      this.valid = true;
    }
  }

  private initForm(): FormGroup {
    const form: FormGroup = this.fb.group({
      Name: this.fb.control(''),
      Pass: this.fb.control(''),
    });

    return form;
  }
}
