import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap';
import { RegisterComponent } from '../register.component';

@Component({
  selector: 'app-measurements-details',
  templateUrl: './measurements-details.component.html',
  styleUrls: ['./measurements-details.component.scss']
})
export class MeasurementsDetailsComponent implements OnInit {

  private errors: string[];
  private modalRef: BsModalRef;
  @Input() private registerForm: FormGroup;
  constructor(private modalService: BsModalService, private register: RegisterComponent) { }

  ngOnInit() {
  }

  private openModal(template: TemplateRef<any>) {
    const config: ModalOptions = {class: 'modal-xl'}
    this.modalRef = this.modalService.show(template, config);
 }

 private onSubmit() {
  this.register.onSubmit();
}

}
