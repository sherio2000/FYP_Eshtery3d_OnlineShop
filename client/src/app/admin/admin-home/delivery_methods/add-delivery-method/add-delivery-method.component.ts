import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { ICategories } from 'src/app/shared/models/ICategories';

@Component({
  selector: 'app-add-delivery-method',
  templateUrl: './add-delivery-method.component.html',
  styleUrls: ['./add-delivery-method.component.scss']
})
export class AddDeliveryMethodComponent implements OnInit {

  private AddDeliverMethodForm: FormGroup;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.createAddDeliveryMethod();
  }

  private createAddDeliveryMethod() {
    this.AddDeliverMethodForm = new FormGroup ({
      ShortName: new FormControl(null, [Validators.required]),
      DeliveryTime: new FormControl(null, [Validators.required]),
      Description: new FormControl(null, [Validators.required]),
      Price: new FormControl(5, [Validators.required])
    });
  }

  private OnSubmit() {
    this.adminService.addDeliveryMethod(this.AddDeliverMethodForm.value).subscribe((methods: IDeliveryMethod) => {
      this.createAddDeliveryMethod();
    });
  }

}
