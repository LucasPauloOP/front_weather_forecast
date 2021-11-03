import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { WeatherForecastService } from 'src/app/service/weather-forecast.service';
import { Country, State, City } from 'country-state-city';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public form: FormGroup;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter<any>();

  public listCountry = [
    { label: 'Brasil', value: 'BR' }
  ];
  public listState = [
    { label: 'Minas Gerais', value: 'MG' }
  ];
  public listCity = [
    { label: 'Ipatinga', value: 'Ipatinga' }
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
    this.getCountry();
  }

  getCountry() {
    const countries = Country.getAllCountries();

    if (countries && countries.length > 0) {
      this.listCountry = countries.map(country => {
        return {
          label: country.name,
          value: country.isoCode
        }
      })
    }

    if (this.listCountry?.length) this.getStates();
  }

  getStates() {
    const states = State.getStatesOfCountry(this.form.value.country)

    if (states && states.length) {
      this.listState = states.map(state => {
        return {
          label: state.name,
          value: state.isoCode
        }
      })
    }

    if (this.listState.length > 0) {
      this.form.get('state')?.setValue(this.listState[0].value);

      this.getCity();
    }

  }

  getCity() {
    const cities = City.getCitiesOfState(this.form.value.country, this.form.value.state);

    if (cities && cities.length) {
      this.listCity = cities.map(city => {
        return {
          label: city.name,
          value: city.name
        }
      })
    }

    if (this.listCity.length > 0) this.form.get('city')?.setValue(this.listCity[0].value);
  }
}
