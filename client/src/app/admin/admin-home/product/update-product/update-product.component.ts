import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { AdminService } from 'src/app/admin/admin.service';
import { IAddProduct } from 'src/app/shared/models/IaddProduct';
import { IBrand } from 'src/app/shared/models/IBrand';
import { ICategories } from 'src/app/shared/models/ICategories';
import { IColors } from 'src/app/shared/models/IColor';
import { IProduct } from 'src/app/shared/models/Iproduct';
import { IProductType } from 'src/app/shared/models/IProductType';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
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
  private UpdateProductForm: FormGroup;
  private product: IProduct = {
    id: 0,
  name: null,
  description: null,
  specifications: null,
  product3dUrl: null,
  price: 0,
  productDiscount: 0,
  pictureUrl: null,
  pictureUrl1: null,
  pictureUrl2: null,
  pictureUrl3: null,
  pictureUrl4: null,
  productType: null,
  productBrand: null,
  productColor: null,
  productCategory: null
  };
  @Input() private id;
  private modalRef: BsModalRef;
  // tslint:disable-next-line: ban-types
  private updated: Boolean = false;

  constructor(private http: HttpClient, private adminService: AdminService) { }

  ngOnInit() {
    this.createAddProductForm();
    this.loadProduct();
    this.getBrands();
    this.getProductType();
    this.getColors();
    this.getCategories();
    this.setImgValues();
    console.log(this.product.pictureUrl4);
  }

  private setImgValues() {
    if (this.product.pictureUrl4) {
      this.UpdateProductForm.patchValue({
        pictureUrl4: this.product.pictureUrl4
      });
    }
    if (this.product.pictureUrl3) {
      this.UpdateProductForm.patchValue({
        pictureUrl3: this.product.pictureUrl3
      });
    }
    if (this.product.pictureUrl2) {
      this.UpdateProductForm.patchValue({
        pictureUrl2: this.product.pictureUrl2
      });
    }
    if (this.product.pictureUrl1) {
      this.UpdateProductForm.patchValue({
        pictureUrl1: this.product.pictureUrl1
      });
    }
    console.log(this.UpdateProductForm.get('pictureUrl4').value);
  }

  private loadProduct() {
    // tslint:disable-next-line: deprecation
    this.adminService.getProduct(this.id).subscribe((products: IProduct) => {
      this.product.pictureUrl = products.pictureUrl;
      this.product.name = products.name;
      this.product.id = products.id;
      this.product.description = products.description;
      this.product.specifications = products.specifications;
      this.product.productBrand = products.productBrand;
      this.product.productCategory = products.productCategory;
      this.product.productColor = products.productColor;
      this.product.productType = products.productType;
      this.product.price = products.price;
      if (products.pictureUrl1) {
        this.product.pictureUrl1 = products.pictureUrl1;
      }
      if (products.pictureUrl2) {
        this.product.pictureUrl2 = products.pictureUrl2;
      }
      if (products.pictureUrl3) {
        this.product.pictureUrl3 = products.pictureUrl3;
      }
      if (products.pictureUrl4) {
        this.product.pictureUrl4 = products.pictureUrl4;
      }
      if (products.product3dUrl) {
        this.product.product3dUrl = products.product3dUrl;
      }
      if (products.productDiscount) {
        this.product.productDiscount = products.productDiscount;
      }
      if (products.product3dUrl) {
        this.product.product3dUrl = products.product3dUrl;
      }

      console.log('FETCHDD2' + products.pictureUrl4);
    }, error => {
      console.log(error);
    });
  }


  private createAddProductForm() {
    this.UpdateProductForm = new FormGroup ({
      Name: new FormControl('', [Validators.required]),
      Description: new FormControl('', [Validators.required]),
      Specifications: new FormControl('', [Validators.required]),
      pictureUrl: new FormControl(''),
      pictureUrl1: new FormControl(''),
      pictureUrl2: new FormControl(''),
      pictureUrl3: new FormControl(''),
      pictureUrl4: new FormControl(''),
      picture3dUrl: new FormControl(''),
      productColorId: new FormControl(0),
      productCategoryId: new FormControl(0),
      productTypeId: new FormControl(0),
      productBrandId: new FormControl(0),
      productPrice: new FormControl(1 , [Validators.required]),
      productDiscount: new FormControl(0.0)
    });
  }

  private removeImg1() {
    this.product.pictureUrl1 = '';
    this.prodPic2Name = '';
    this.UpdateProductForm.patchValue( {
      pictureUrl1: null
    });
  }
  private removeImg2() {
    this.product.pictureUrl2 = '';
    this.prodPic3Name = '';
    this.UpdateProductForm.patchValue( {
      pictureUrl2: null
    });
  }
  private removeImg3() {
    this.product.pictureUrl3 = '';
    this.prodPic4Name = '';
    this.UpdateProductForm.patchValue( {
      pictureUrl3: null
    });
  }
  private removeImg4() {
    this.product.pictureUrl4 = '';
    this.prodPic5Name = '';
    this.UpdateProductForm.patchValue( {
      pictureUrl4: null
    });
  }

  private removeProd3dModel() {
    this.product.product3dUrl = '';
    this.prod3dName = '';
    this.UpdateProductForm.patchValue( {
      picture3dUrl: null
    });
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
    this.UpdateProductForm.patchValue( {
      pictureUrl: 'images/products/' + this.prodPic1Name
    });
  }

  private uploadFileimg2 = (files) => {
    if (files.length === 0) {
      return;
    }
    this.prodPic2 = files[0] as File;
    this.prodPic2Name = this.prodPic2.name.toString();
    const formData = new FormData();
    formData.append('file', this.prodPic2, this.prodPic2.name);
    this.http.post(this.basUrl + 'image/add', formData)
    .subscribe();
    this.UpdateProductForm.patchValue( {
      pictureUrl1: 'images/products/' + this.prodPic2Name
    });
  }

  public uploadFileimg3 = (files) => {
    if (files.length === 0) {
      return;
    }
    this.prodPic3 = files[0] as File;
    this.prodPic3Name = this.prodPic3.name.toString();
    const formData = new FormData();
    formData.append('file', this.prodPic3, this.prodPic3.name);
    this.http.post(this.basUrl + 'image/add', formData)
    .subscribe();
    this.UpdateProductForm.patchValue( {
      pictureUrl2: 'images/products/' + this.prodPic3Name
    });
  }

  public uploadFileimg4 = (files) => {
    if (files.length === 0) {
      return;
    }
    this.prodPic4 = files[0] as File;
    this.prodPic4Name = this.prodPic4.name.toString();
    const formData = new FormData();
    formData.append('file', this.prodPic4, this.prodPic4.name);
    this.http.post(this.basUrl + 'image/add', formData)
    .subscribe();
    this.UpdateProductForm.patchValue( {
      pictureUrl3: 'images/products/' + this.prodPic4Name
    });
  }

  public uploadFileimg5 = (files) => {
    if (files.length === 0) {
      return;
    }
    this.prodPic5 = files[0] as File;
    this.prodPic5Name = this.prodPic5.name.toString();
    const formData = new FormData();
    formData.append('file', this.prodPic5, this.prodPic5.name);
    this.http.post(this.basUrl + 'image/add', formData)
    .subscribe();
    this.UpdateProductForm.patchValue( {
      pictureUrl4: 'images/products/' + this.prodPic5Name
    });
  }

  public uploadFile3d = (files) => {
    if (files.length === 0) {
      return;
    }
    this.prod3dFile = files[0] as File;
    this.prod3dName = this.prod3dFile.name.toString();
    const formData = new FormData();
    formData.append('file', this.prod3dFile, this.prod3dFile.name);
    this.http.post(this.basUrl + 'model/addmodel', formData)
    .subscribe();
    this.UpdateProductForm.patchValue( {
      picture3dUrl: 'images/models/' + this.prod3dName
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

  private OnSubmit() {
    console.log(this.UpdateProductForm.value);
    if (this.prodPic2Name === '' && this.product.pictureUrl1) {
      var pictureUrl = this.product.pictureUrl1;
      var finalPicrUrl = pictureUrl.split('localhost:5001/').pop();
      this.UpdateProductForm.patchValue( {
        pictureUrl1: finalPicrUrl
      });
    }
    if (this.prodPic3Name === ''  && this.product.pictureUrl2) {
      var pictureUrl = this.product.pictureUrl2;
      var finalPicrUrl = pictureUrl.split('localhost:5001/').pop();
      this.UpdateProductForm.patchValue( {
        pictureUrl2: finalPicrUrl
      });
    }
    if (this.prodPic4Name === ''  && this.product.pictureUrl3) {
      var pictureUrl = this.product.pictureUrl3;
      var finalPicrUrl = pictureUrl.split('localhost:5001/').pop();
      this.UpdateProductForm.patchValue( {
        pictureUrl3: finalPicrUrl
      });
    }
    if (this.prodPic5Name === ''  && this.product.pictureUrl4) {
      var pictureUrl = this.product.pictureUrl4;
      var finalPicrUrl = pictureUrl.split('localhost:5001/').pop();
      this.UpdateProductForm.patchValue( {
        pictureUrl4: finalPicrUrl
      });
    }
    if (this.UpdateProductForm.get('picture3dUrl').value === '') {
      var pictureUrl = this.product.product3dUrl;
      var finalPicrUrl = pictureUrl.split('localhost:5001/').pop();
      this.UpdateProductForm.patchValue( {
        picture3dUrl: finalPicrUrl
      });
    }
    const pod: IAddProduct = {
      // tslint:disable-next-line: radix
      id: parseInt(this.id),
      name: this.UpdateProductForm.get('Name').value,
      description: this.UpdateProductForm.get('Description').value,
      specifications: this.UpdateProductForm.get('Specifications').value,
      price: this.UpdateProductForm.get('productPrice').value,
      pictureUrl: this.UpdateProductForm.get('pictureUrl').value,
      pictureUrl1: this.UpdateProductForm.get('pictureUrl1').value,
      pictureUrl2: this.UpdateProductForm.get('pictureUrl2').value,
      pictureUrl3: this.UpdateProductForm.get('pictureUrl3').value,
      pictureUrl4: this.UpdateProductForm.get('pictureUrl4').value,
      productBrandId: this.UpdateProductForm.get('productBrandId').value,
      productColorId: this.UpdateProductForm.get('productColorId').value,
      productCategoryId: this.UpdateProductForm.get('productCategoryId').value,
      productTypeId: this.UpdateProductForm.get('productTypeId').value,
      productDiscount: this.UpdateProductForm.get('productDiscount').value,
      product3dUrl: this.UpdateProductForm.get('picture3dUrl').value
    };
    this.adminService.updateProduct(pod).subscribe((productadd: IAddProduct) => {
      this.updated = true;
    });
  }

}
