import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{
  @Input() chartLabels: string[] = [];
  @Input() chartData: Number[] = [];
  @Input() chartType: ChartType = 'bar';
  @Input() chartOptions: ChartOptions = { responsive: true };
  @Input() chartLegend: boolean = true;
  public chart: any;
  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }
  createChart(){

    this.chart = new Chart("MyChart", {
      type: this.chartType , //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.chartLabels,
	       datasets: [
          {
            label: "Doanh thu",
            data: this.chartData,
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }
}
