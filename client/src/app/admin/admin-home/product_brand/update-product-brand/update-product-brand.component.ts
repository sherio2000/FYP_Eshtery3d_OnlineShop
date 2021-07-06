import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { IBrand } from 'src/app/shared/models/IBrand';
import { ICategories } from 'src/app/shared/models/ICategories';

@Component({
  selector: 'app-update-product-brand',
  templateUrl: './update-product-brand.component.html',
  styleUrls: ['./update-product-brand.component.scss']
})
export class UpdateProductBrandComponent implements OnInit {
  
  private updateProductBrandForm: FormGroup;
  private brand: IBrand;
  @Input() private id;
  private updated: true;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadBrand();
    this.createUpdateFormGroup();
  }

  private loadBrand() {
    // tslint:disable-next-line: deprecation
    this.adminService.getBrand(this.id).subscribe(brand => {
      this.brand = brand;
    });
  }

  private createUpdateFormGroup() {
    this.updateProductBrandForm = new FormGroup ({
      Name: new FormControl('', [Validators.required])
    });
  }

  private OnSubmit() {
    const addBrand: IBrand = {
      id: this.id,
      name: this.updateProductBrandForm.get('Name').value
    };
    this.adminService.updateProductBrand(addBrand).subscribe((brand: IBrand) => {
      this.updated = true;
    });
  }
}
