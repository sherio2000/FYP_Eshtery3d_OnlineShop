import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { IProductType } from 'src/app/shared/models/IProductType';

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.scss']
})
export class AddProductTypeComponent implements OnInit {

  private AddProductTypeForm: FormGroup;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.createAddProductTypeForm();
  }

  private createAddProductTypeForm() {
    this.AddProductTypeForm = new FormGroup ({
      Name: new FormControl('', [Validators.required])
    });
  }

  private OnSubmit() {
    this.adminService.addType(this.AddProductTypeForm.value).subscribe((type: IProductType) => {
      this.createAddProductTypeForm();
    });
  }


}
