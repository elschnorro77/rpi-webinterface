import { Component, OnInit } from '@angular/core';
import {AppService} from '../../services/app.service';
import 'rxjs-compat/add/operator/finally';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css']
})
export class MeasurementComponent implements OnInit {

  public measurement;
  public isLoading = false;
  public noData = false;
  public numbers;

  constructor(private appService: AppService) {
    const maxLength = 8 * 10;
    this.numbers = Array(maxLength).fill(0).map((x, i) => i);
  }

  ngOnInit() {
  //  this.getMeasurement();
  }

  getMeasurement(): void {
    this.measurement = null;
    this.isLoading = true;
    this.appService.getMeasurement()
      .finally(() => this.isLoading = false)
      .subscribe(res => {
        console.log(res);
        if (res) {
          this.measurement = <any>res;
          this.noData = false;
        } else {
          this.noData = true;
        }
      }, (err: any) => {
        console.error(err);
      });
  }

  get debugInfo(): string {
    if (this.measurement && this.measurement.includes('{')) {
      const str = this.measurement.split('{')[0];
      return str;
    }
    return null;
  }

  get thingSpeakFields(): JSON {
    if (this.measurement && this.measurement.includes('{')) {
      let str = this.measurement.split('{');
      str = '{' + str[str.length - 1];
      return JSON.parse(str);
    }
    return null;
  }
}
