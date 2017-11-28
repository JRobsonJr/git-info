import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-example-2',
  templateUrl: './test-example-2.component.html',
  styleUrls: ['./test-example-2.component.css']
})
export class TestExample2Component implements OnInit {
  chartData: Array<any>;

    constructor() {}

    ngOnInit() {
      // give everything a chance to get loaded before starting the animation to reduce choppiness
      setTimeout(() => {
        this.generateData();

        // change the data periodically
        setInterval(() => this.generateData(), 3000);
      }, 1000);
    }

    generateData() {
      this.chartData = [];
      for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
        this.chartData.push([
          `Index ${i}`,
          Math.floor(Math.random() * 100)
        ]);
      }
    }

}
