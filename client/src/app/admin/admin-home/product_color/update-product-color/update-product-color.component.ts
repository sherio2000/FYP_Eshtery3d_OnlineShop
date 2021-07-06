import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { IColors } from 'src/app/shared/models/IColor';

@Component({
  selector: 'app-update-product-color',
  templateUrl: './update-product-color.component.html',
  styleUrls: ['./update-product-color.component.scss']
})
export class UpdateProductColorComponent implements OnInit {

  private updateProductColorForm: FormGroup;
  private color: IColors = {
    id: 0,
    name: ''
  };
  @Input() private id;
  private updated: true;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadColor();
    this.createUpdateFormGroup();
  }

  private loadColor() {
    // tslint:disable-next-line: deprecation
    this.adminService.getColor(this.id).subscribe(color => {
      this.color = color;
    });
  }

  private createUpdateFormGroup() {
    this.updateProductColorForm = new FormGroup ({
      Name: new FormControl('', [Validators.required])
    });
  }

  private OnSubmit() {
    const addColor: IColors = {
      id: this.id,
      name: this.updateProductColorForm.get('Name').value
    };
    this.adminService.updateProductColor(addColor).subscribe((color: IColors) => {
      this.updated = true;
    });
  }

}
