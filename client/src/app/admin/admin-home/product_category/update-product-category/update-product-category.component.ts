import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { ICategories } from 'src/app/shared/models/ICategories';

@Component({
  selector: 'app-update-product-category',
  templateUrl: './update-product-category.component.html',
  styleUrls: ['./update-product-category.component.scss']
})
export class UpdateProductCategoryComponent implements OnInit {

  private updateProductCategoryForm: FormGroup;
  private category: ICategories;
  @Input() private id;
  private updated: true;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadCategory();
    this.createUpdateFormGroup();
  }

  private loadCategory() {
    // tslint:disable-next-line: deprecation
    this.adminService.getCategory(this.id).subscribe(category => {
      this.category = category;
    });
  }

  private createUpdateFormGroup() {
    this.updateProductCategoryForm = new FormGroup ({
      Name: new FormControl('', [Validators.required])
    });
  }

  private OnSubmit() {
    const addCategory: ICategories = {
      id: this.id,
      name: this.updateProductCategoryForm.get('Name').value
    };
    this.adminService.updateProductCategory(addCategory).subscribe((category: ICategories) => {
      this.updated = true;
    });
  }

}
