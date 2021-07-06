import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal-service',
  templateUrl: './modal-service.component.html',
  styleUrls: ['./modal-service.component.scss']
})
export class ModalServiceComponent implements OnInit {

  @Input() private product3dUrl;
  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private modal: ModalService ) { }

  ngOnInit() {
    this.modal.createScene(this.rendererCanvas,  'assets/models/dellLaptop.glb');
    this.modal.animate();
  }

}
