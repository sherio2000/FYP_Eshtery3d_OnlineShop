import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { IProductType } from 'src/app/shared/models/IProductType';

@Component({
  selector: 'app-update-product-type',
  templateUrl: './update-product-type.component.html',
  styleUrls: ['./update-product-type.component.scss']
})
export class UpdateProductTypeComponent implements OnInit {

  private updateProductTypeForm: FormGroup;
  private type: IProductType;
  @Input() private id;
  private updated: true;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadType();
    this.createUpdateFormGroup();
  }

  private loadType() {
    // tslint:disable-next-line: deprecation
    this.adminService.getType(this.id).subscribe(type => {
      this.type = type;
    });
  }

  private createUpdateFormGroup() {
    this.updateProductTypeForm = new FormGroup ({
      Name: new FormControl('', [Validators.required])
    });
  }

  private OnSubmit() {
    const addType: IProductType = {
      id: this.id,
      name: this.updateProductTypeForm.get('Name').value
    };
    this.adminService.updateProductType(addType).subscribe((type: IProductType) => {
      this.updated = true;
    });
  }

}
