import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';

@Component({
  selector: 'app-update-delivery-method',
  templateUrl: './update-delivery-method.component.html',
  styleUrls: ['./update-delivery-method.component.scss']
})
export class UpdateDeliveryMethodComponent implements OnInit {

  private updateDeliveryMethodForm: FormGroup;
  private deliveryMethod: IDeliveryMethod;
  @Input() private id;
  private updated: true;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadDeliveryMethod();
    this.createUpdateFormGroup();
  }

  private loadDeliveryMethod() {
    // tslint:disable-next-line: deprecation
    this.adminService.getDeliveryMethod(this.id).subscribe(method => {
      this.deliveryMethod = method;
    });
  }

  private createUpdateFormGroup() {
    this.updateDeliveryMethodForm = new FormGroup ({
      ShortName: new FormControl('', [Validators.required]),
      DeliveryTime: new FormControl(null, [Validators.required]),
      Description: new FormControl(null, [Validators.required]),
      Price: new FormControl(5, [Validators.required])
    });
  }

  private OnSubmit() {
    const addDeliveryMethod: IDeliveryMethod = {
      id: this.id,
      shortName: this.updateDeliveryMethodForm.get('ShortName').value,
      description: this.updateDeliveryMethodForm.get('Description').value,
      deliveryTime: this.updateDeliveryMethodForm.get('DeliveryTime').value,
      price: this.updateDeliveryMethodForm.get('Price').value
    };
    this.adminService.updateDeliveryMethod(addDeliveryMethod).subscribe((method: IDeliveryMethod) => {
      this.updated = true;
    });
  }

}
