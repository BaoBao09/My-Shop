import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private _api: ApiService){
  }
  public profit : any;
  public chartLabels : string[] = [];
  public chartData : Number[] = [];
  async ngOnInit(): Promise<void> {
    this.profit =  (await this._api.get('HDBan/GetStatistic').toPromise()).data;
    this.profit.forEach(e => {
      this.chartLabels.push(e.name);
      this.chartData.push(e.value);
    });
  }
}
