import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ThreeDService } from './three-d.service';

@Component({
  selector: 'app-three-dmodel',
  templateUrl: './three-dmodel.component.html',
  styleUrls: ['./three-dmodel.component.scss']
})
export class ThreeDModelComponent implements OnInit {

  @Input() private product3dUrl;
  @ViewChild('rendererCanvas', {static: true})

  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private modal: ThreeDService) { }

  ngOnInit() {
    this.modal.createScene(this.rendererCanvas, this.product3dUrl);
    this.modal.animate();
  }

}
