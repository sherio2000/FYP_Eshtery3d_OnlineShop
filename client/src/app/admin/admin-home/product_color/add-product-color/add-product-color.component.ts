import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { IColors } from 'src/app/shared/models/IColor';

@Component({
  selector: 'app-add-product-color',
  templateUrl: './add-product-color.component.html',
  styleUrls: ['./add-product-color.component.scss']
})
export class AddProductColorComponent implements OnInit {

  private AddProductColorForm: FormGroup;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.createAddProductColorForm();
  }

  private createAddProductColorForm() {
    this.AddProductColorForm = new FormGroup ({
      Name: new FormControl('', [Validators.required])
    });
  }

  private OnSubmit() {
    this.adminService.addColor(this.AddProductColorForm.value).subscribe((category: IColors) => {
      this.createAddProductColorForm();
    });
  }

}
