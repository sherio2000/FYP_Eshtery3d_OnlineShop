import { HttpClient, HttpEventType } from '@angular/common/http';
import { IBrand } from 'src/app/shared/models/IBrand';
import { IProductType } from 'src/app/shared/models/IProductType';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AdminService } from 'src/app/admin/admin.service';
import { IColors } from 'src/app/shared/models/IColor';
import { ICategories } from 'src/app/shared/models/ICategories';
import { Router } from '@angular/router';
import { IAddProduct } from 'src/app/shared/models/IaddProduct';
import { AdminHomeComponent } from '../../admin-home.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  private productType: IProductType[];
  private colors: IColors[];
  private categories: ICategories[];
  private brands: IBrand[];
  private basUrl = environment.apiUrl;
  private prodPic1: File;
  private prodPic1Name = '';
  private prodPic2: File;
  private prodPic2Name = '';
  private prodPic3: File;
  private prodPic3Name = '';
  private prodPic4: File;
  private prodPic4Name = '';
  private prodPic5Name = '';
  private prod3dName = '';
  private prodPic5: File;
  private prod3dFile: File;
  private AddProductForm: FormGroup;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient, private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.createAddProductForm();
    this.getBrands();
    this.getProductType();
    this.getColors();
    this.getCategories();
    console.log(this.prodPic1Name);
  }

  private uploadFileimg1 = (files) => {
    if (files.length === 0) {
      return;
    }
    this.prodPic1 = files[0] as File;
    this.prodPic1Name = this.prodPic1.name.toString();
    const formData = new FormData();
    formData.append('file', this.prodPic1, this.prodPic1.name);
    this.http.post(this.basUrl + 'image/add', formData)
    .subscribe();
    this.AddProductForm.patchValue( {
      pictureUrl: 'images/products/' + this.prodPic1Name
    });
  }

  private uploadFileimg2 = (files) => {
    if (files.length === 0) {
      return;
    }
    this.prodPic2 = files[0] as File;
    const formData = new FormData();
    formData.append('file', this.prodPic2, this.prodPic2.name);
    this.http.post(this.basUrl + 'image/add', formData)
    .subscribe();
    this.AddProductForm.patchValue( {
      pictureUrl1: 'images/products/' + this.prodPic2Name
    });
  }

  public uploadFileimg3 = (files) => {
    if (files.length === 0) {
      return;
    }
    this.prodPic3 = files[0] as File;
    const formData = new FormData();
    formData.append('file', this.prodPic3, this.prodPic3.name);
    this.http.post(this.basUrl + 'image/add', formData)
    .subscribe();
    this.AddProductForm.patchValue( {
      pictureUrl2: 'images/products/' + this.prodPic3Name
    });
  }

  public uploadFileimg4 = (files) => {
    if (files.length === 0) {
      return;
    }
    this.prodPic4 = files[0] as File;
    const formData = new FormData();
    formData.append('file', this.prodPic4, this.prodPic4.name);
    this.http.post(this.basUrl + 'image/add', formData)
    .subscribe();
    this.AddProductForm.patchValue( {
      pictureUrl3: 'images/products/' + this.prodPic4Name
    });
  }

  public uploadFileimg5 = (files) => {
    if (files.length === 0) {
      return;
    }
    this.prodPic5 = files[0] as File;
    const formData = new FormData();
    formData.append('file', this.prodPic5, this.prodPic5.name);
    this.http.post(this.basUrl + 'image/add', formData)
    .subscribe();
    this.AddProductForm.patchValue( {
      pictureUrl4: 'images/products/' + this.prodPic5Name
    });
  }

  public uploadFile3d = (files) => {
    if (files.length === 0) {
      return;
    }
    this.prod3dFile = files[0] as File;
    const formData = new FormData();
    formData.append('file', this.prod3dFile, this.prod3dFile.name);
    this.http.post(this.basUrl + 'image/add', formData)
    .subscribe();
    this.AddProductForm.patchValue( {
      pictureUrl4: 'images/models/' + this.prod3dName
    });

  }

  private createAddProductForm() {
    this.AddProductForm = new FormGroup ({
      Name: new FormControl('', [Validators.required]),
      Description: new FormControl('', [Validators.required]),
      Specifications: new FormControl('', [Validators.required]),
      pictureUrl: new FormControl(''),
      pictureUrl1: new FormControl(''),
      pictureUrl2: new FormControl(''),
      pictureUrl3: new FormControl(''),
      pictureUrl4: new FormControl(''),
      picture3dUrl: new FormControl(''),
      productColorId: new FormControl(0, [Validators.required]),
      productCategoryId: new FormControl(0, [Validators.required]),
      productTypeId: new FormControl(0, [Validators.required]),
      productBrandId: new FormControl(0, [Validators.required]),
      productPrice: new FormControl(0, [Validators.required]),
      productDiscount: new FormControl(0)
    });
  }

  private getBrands() {
    this.adminService.getBrands().subscribe(Response => {
      this.brands = [...Response];
    // tslint:disable-next-line: no-shadowed-variable
    }, error => {
      console.log(error);
    });
  }
  private getProductType() {
    this.adminService.getProductTypes().subscribe(Response => {
      this.productType = [...Response];
    // tslint:disable-next-line: no-shadowed-variable
    }, error => {
      console.log(error);
    });
  }
  private getColors() {
    this.adminService.getColors().subscribe(Response => {
      this.colors = [...Response];
    // tslint:disable-next-line: no-shadowed-variable
    }, error => {
      console.log(error);
    });
  }
  private getCategories() {
    this.adminService.getCategories().subscribe(Response => {
      this.categories = [...Response];
    }, error => {
      console.log(error);
    });
  }

  private parseStringToInt() {
    const prodPric = this.AddProductForm.get('productPrice').value;
    // tslint:disable-next-line: radix
    const price = parseInt(prodPric);
    console.log(prodPric);
  }

  private OnSubmit() {
    console.log(this.AddProductForm.value);
    this.adminService.addProduct(this.AddProductForm.value).subscribe((product: IAddProduct) => {
      this.createAddProductForm();
    });
  }


}
