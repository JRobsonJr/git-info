import { ProjectDataService } from "./../../project/project-data.service";
import { Component, Input, OnInit } from "@angular/core";

import * as d3 from "d3";
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.css"]
})
export class LineChartComponent implements OnInit {
  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;
  @Input() private projectId: number;
  private commitFrequency: Array<any>;

  constructor(private projectService: ProjectDataService) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    this.projectService.getCommitFrequency(this.projectId).subscribe(resp => {
      this.commitFrequency = resp;
      this.initSvg();
      this.initAxis();
      this.drawAxis();
      this.drawLine();
    });
  }

  private initSvg() {
    this.svg = d3
      .select("svg")
      .append("g")
      .attr(
        "transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")"
      );
  }

  private initAxis() {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    console.log(this.commitFrequency);
    this.x.domain(d3Array.extent(this.commitFrequency, d => d.date));
    this.y.domain(d3Array.extent(this.commitFrequency, d => d.value));
  }

  private drawAxis() {
    this.svg
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3Axis.axisBottom(this.x));

    this.svg
      .append("g")
      .attr("class", "axis axis--y")
      .call(d3Axis.axisLeft(this.y))
      .append("text")
      .attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");
  }

  private drawLine() {
    let parseTime = d3.timeParse("%Y-%m-%d");

    this.line = d3Shape
      .line()
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.value));

      console.log(this.commitFrequency);
    this.svg
      .append("path")
      .datum(this.commitFrequency)
      .attr("class", "line")
      .attr("d", this.line);
  }
}
