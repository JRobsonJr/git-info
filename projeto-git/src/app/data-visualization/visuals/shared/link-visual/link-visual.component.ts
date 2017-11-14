import { Link } from './../../../data-visualization/d3/models/link';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'linkVisual',
  templateUrl: './link-visual.component.html',
  styleUrls: ['./link-visual.component.css']
})
export class LinkVisualComponent implements OnInit {
  
  @Input('linkVisual') link: Link;
  
  constructor() { }

  ngOnInit() {
  }

}
