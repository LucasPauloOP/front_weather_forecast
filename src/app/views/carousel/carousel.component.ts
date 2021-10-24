import { Component, OnInit, Input } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() data:any;
  @Input() dataSearch:any;
  public moment = moment;

  constructor(private config: NgbCarouselConfig) {
    this.config.interval = 10000;
    this.config.wrap = false;
    this.config.keyboard = false;
    this.config.pauseOnHover = false;
  }

  ngOnInit(): void {
  }

  getIcon(weather:any) {
    switch(weather.main.toLowerCase()) {
      case 'rain':
          return 'chuvoso48x48px.png';
      case 'tempest':
          return 'tempestade48x48px.png';
      case 'nublado':
          return 'nublado';
      case 'nublado':
          return 'parcialmentenublado48x48px';
      case 'nublado':
          return 'solcomchuva48x48px';
      default:
        return 'ensolarado48x48px.png';
    }
  }

  getBackground(weather:any) {
    if (weather.id >= 200 &&  weather.id < 300) return 'tempestade.png';
    if (weather.id < 400) return 'solcomchuva1.png';
    if (weather.id >= 500 && weather.id < 600) return 'chuvoso.png';
    if (weather.id < 700) return 'neve.jpeg';
    if (weather.id < 800) return 'tempestde.png';
    if (weather.id < 801) return 'ensolarado2.png';
    if (weather.id >= 801) return 'parcialmentenublado.png';

    return 'ensolarado2.png';
  }

  getTrunc(number=0.0) {
    return Math.trunc(number);
  }

  translateWeather(weather:any) {
    if (weather.id >= 200 &&  weather.id < 300) return 'Tempestade';
    if (weather.id < 400) return 'Sol com chuva';
    if (weather.id >= 500 && weather.id < 600) return 'Chuvoso';
    if (weather.id < 700) return 'Neve';
    if (weather.id < 800) return 'Tempestde';
    if (weather.id < 801) return 'Ensolarado';
    if (weather.id >= 801) return 'Parcialmente Nublado';

    return 'Ensolarado';
  }
}
