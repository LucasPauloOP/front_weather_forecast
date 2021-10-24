import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from 'src/app/service/weather-forecast.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {
  public daily: any;
  public sendRequest: boolean = false;
  constructor(private service: WeatherForecastService) {}
  dataSearch: any;

  ngOnInit(): void {
  }

  getForecast(params: any) {
    if (this.sendRequest) return ;

    this.dataSearch = params;

    this.sendRequest = true;

    this.daily = [];
      this.service.getForecast(params.country, params.state, params.city)
      .subscribe(data => {
        const weatherForecast = data;
        console.log(weatherForecast);
        if (!weatherForecast) this.daily = [];
        this.daily = weatherForecast.daily;
        this.sendRequest = false;
      }, (err) => {
        this.sendRequest = false;
        console.log(err);
      });
  }

}
