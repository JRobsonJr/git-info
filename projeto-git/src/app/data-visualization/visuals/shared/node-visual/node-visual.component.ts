import { Component, OnInit, Input } from '@angular/core';

import { Node } from './../../../data-visualization/d3/models/node';

@Component({
  selector: 'nodeVisual',
  templateUrl: './node-visual.component.html',
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent implements OnInit {

  @Input('nodeVisual') node: Node;
  
  constructor() { }

  ngOnInit() {
  }

}
