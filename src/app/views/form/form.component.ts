import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      city: ['Ipatinga', Validators.required],
      state: ['MG', Validators.required],
      country: ['Brasil', Validators.required],
    });
  }

  ngOnInit(): void {
  }

}
