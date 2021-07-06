import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { ICategories } from 'src/app/shared/models/ICategories';

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.scss']
})
export class AddProductCategoryComponent implements OnInit {

  private AddProductCatForm: FormGroup;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.createAddProductCategoryForm();
  }

  private createAddProductCategoryForm() {
    this.AddProductCatForm = new FormGroup ({
      Name: new FormControl('', [Validators.required])
    });
  }

  private OnSubmit() {
    this.adminService.addCategory(this.AddProductCatForm.value).subscribe((category: ICategories) => {
      this.createAddProductCategoryForm();
    });
  }

}
