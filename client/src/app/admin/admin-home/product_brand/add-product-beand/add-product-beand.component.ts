import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { IBrand } from 'src/app/shared/models/IBrand';

@Component({
  selector: 'app-add-product-beand',
  templateUrl: './add-product-beand.component.html',
  styleUrls: ['./add-product-beand.component.scss']
})
export class AddProductBeandComponent implements OnInit {
  private AddProductBrandForm: FormGroup;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.createAddProductBrandForm();
  }

  private createAddProductBrandForm() {
    this.AddProductBrandForm = new FormGroup ({
      Name: new FormControl('', [Validators.required])
    });
  }

  private OnSubmit() {
    this.adminService.addBrand(this.AddProductBrandForm.value).subscribe((brand: IBrand) => {
      this.createAddProductBrandForm();
    });
  }

}
