import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { WeatherForecastService } from 'src/app/service/weather-forecast.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public form: FormGroup;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter<any>();

  public listCountry = [
    {label:'Brasil', value:'BR'}
  ];
  public listState = [
    {label:'Minas Gerais', value:'MG'}
  ];
  public listCity = [
    {label:'Ipatinga', value:'Ipatinga'}
  ];

  constructor(
    private fb: FormBuilder,
    private ngConfig: NgSelectConfig,
    private service: WeatherForecastService
  ) {
    this.ngConfig.notFoundText = 'Opção não encontrada.';
    this.ngConfig.appendTo = 'body';
    this.ngConfig.bindValue = 'value';

    this.form = this.fb.group({
      city: ['Ipatinga', Validators.required],
      state: ['MG', Validators.required],
      country: ['BR', Validators.required],
    });

  }

  ngOnInit(): void {
    this.getStates();
    this.getCity();
  }

  getStates() {
    this.listState = this.service.getStates();
  }

  getCity() {
    this.listCity = this.service.getCities(this.form.value.state);

    if (this.listCity.length > 0)  this.form.get('city')?.setValue(this.listCity[0].value);
  }
}
