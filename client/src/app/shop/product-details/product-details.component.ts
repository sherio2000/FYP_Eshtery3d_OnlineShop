import { Component, OnInit, TemplateRef } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IMeasurements } from 'src/app/shared/models/IMeasurements';
import { IProduct } from 'src/app/shared/models/Iproduct';
import { IReviews } from 'src/app/shared/models/IReviews';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { IUser } from 'src/app/shared/models/user';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  private productSlider: OwlOptions = {
    loop: false,
    rewind: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoWidth: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  };

  private customOptions: OwlOptions = {
    loop: false,
    rewind: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };


  private product: IProduct = {
    pictureUrl1: null,
    pictureUrl: null,
    pictureUrl2: null,
    pictureUrl3: null,
    pictureUrl4: null,
    price: null,
    product3dUrl: null,
    productBrand: null,
    productCategory: null,
    productColor: null,
    productDiscount: null,
    productType: null,
    specifications: null,
    description: null,
    name: null,
    id: null
  };
  private products: IProduct[];
  private shopParams = new ShopParams();
  private reviews: IReviews[];
  private modalRef: BsModalRef;
  private noOfReviews = 1;
  private totalCount: number;
  private quantity = 1;
  private productSize = null;
  private compareProduct: IProduct;
  private AddReviewFormGroup: FormGroup;
  private userReviwed = 0;
  private reviewed = false;
  private userName = null;
  private productReviewsCount = 0;
  private measures: IMeasurements;
  private cuser: IUser = {
    displayName: null,
    birthDate: null,
    reviewed: null,
    firstName: null,
    lastName: null,
    token: null,
    email: null,
    gender: null
  };
  private Ratingvalue = 5;
  private currentUser$: Observable<IUser>;
  private productRating = 0;
  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute, private bcService: BreadcrumbService
    ,         private basketService: BasketService, private router: Router, private accountService: AccountService
            , private modalService: BsModalService) {
             }

  ngOnInit() {
    this.currentUser$ = this.accountService.currentUser$;
    this.loadUser();
    this.loadProductRating();
    this.loadProduct();
    this.getUserMeasures();
    this.loadReviewsCount();
    this.getIfUserReviewed();
    this.loadReviews();
    this.getProducts();
    this.createAddReviewForm();
  }

  private loadUser() {
    this.currentUser$.subscribe((user: IUser) => {
      this.cuser = user;
    });
  }

  async getUserMeasures() {
    this.accountService.getUserMeasures().subscribe((measures: IMeasurements) => {
      this.measures = measures;
    });
  }

  private calculateUserMeasures() {
    if (this.cuser.gender === 'M') {
      if (this.product.productCategory === 'Pants') {
        if (this.measures.height > 31 && this.measures.height < 32) {
          if (this.measures.waist > 26 && this.measures.waist < 29 ) {
            if (this.measures.hip > 32 && this.measures.hip < 34) {
              this.productSize = 'XS | 44 EU';
            }
          }
        } else if (this.measures.height > 32 && this.measures.height < 33) {
          if (this.measures.waist > 29 && this.measures.waist < 32 ) {
            if (this.measures.hip > 34 && this.measures.hip < 37) {
              this.productSize = 'S | 46 EU';
            }
          }
        } else if (this.measures.height > 33 && this.measures.height < 34 ) {
          if (this.measures.waist > 32 && this.measures.waist < 35 ) {
            if (this.measures.hip > 37 && this.measures.hip < 40) {
              this.productSize = 'M | 48 EU';
            }
          }
        } else if (this.measures.height > 34 && this.measures.height < 35 ) {
          if (this.measures.waist > 35 && this.measures.waist < 39 ) {
            if (this.measures.hip > 40 && this.measures.hip < 43) {
              this.productSize = 'L | 50 - 52 EU';
            }
          }
        } else if (this.measures.height > 35 && this.measures.height < 36 ) {
          if (this.measures.waist > 39 && this.measures.waist < 43 ) {
            if (this.measures.hip > 43 && this.measures.hip < 46 ) {
              this.productSize = 'XL | 54 EU';
            }
          }
        } else if (this.measures.height > 36 && this.measures.height < 37 ) {
          if (this.measures.waist > 43 && this.measures.waist < 47 ) {
            if (this.measures.hip > 46 && this.measures.hip < 50 ) {
              this.productSize = 'XXL | 56 EU';
            }
          }
        }
      } else if (this.product.productCategory === 'T-shirt') {
        if (this.measures.chest > 32 && this.measures.chest < 34) {
          if (this.measures.neck > 13 && this.measures.neck < 14) {
            if (this.measures.waist > 26 && this.measures.waist < 28) {
              if (this.measures.arm > 31 && this.measures.arm < 32) {
                this.productSize = 'XS';
              }
            }
          }
        } else if (this.measures.chest > 34 && this.measures.chest < 37) {
          if (this.measures.neck > 14 && this.measures.neck < 15) {
            if (this.measures.waist > 28 && this.measures.waist < 31) {
              if (this.measures.arm > 32 && this.measures.arm < 33) {
                this.productSize = 'S';
              }
            }
          }
        } else if (this.measures.chest > 37 && this.measures.chest < 40) {
          if (this.measures.neck > 15 && this.measures.neck < 16) {
            if (this.measures.waist > 31 && this.measures.waist < 34) {
              if (this.measures.arm > 33 && this.measures.arm < 36) {
                this.productSize = 'M';
              }
            }
          }
        } else if (this.measures.chest > 40 && this.measures.chest < 43) {
          if (this.measures.neck > 16 && this.measures.neck < 17) {
            if (this.measures.waist > 34 && this.measures.waist < 37) {
              if (this.measures.arm > 36 && this.measures.arm < 37) {
                this.productSize = 'L';
              }
            }
          }
        } else if (this.measures.chest > 43 && this.measures.chest < 46) {
          if (this.measures.neck > 17 && this.measures.neck < 18) {
            if (this.measures.waist > 37 && this.measures.waist < 40) {
              if (this.measures.arm > 37 && this.measures.arm < 38) {
                this.productSize = 'XL';
              }
            }
          }
        } else if (this.measures.chest > 48 && this.measures.chest < 50) {
          if (this.measures.neck > 18 && this.measures.neck < 20) {
            if (this.measures.waist > 40 && this.measures.waist < 45) {
              if (this.measures.arm > 38 && this.measures.arm < 40) {
                this.productSize = 'XXL';
              }
            }
          }
        }
      }
    }
  }

  async loadReviewsCount() {
    this.shopService.getReviewsCount(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(count => {
      this.productReviewsCount = count;
    });
  }

  async getIfUserReviewed() {
    const token = localStorage.getItem('token');
    if (token) {
      this.shopService.getReviewed(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(count => {
        this.userReviwed = count;
        console.log('COUNT' + count);
      });
    }
  }

  private seeMore() {
    if (this.noOfReviews <= this.productReviewsCount) {
      this.noOfReviews += 2;
    }
  }

  private seeLess() {
    this.noOfReviews = 2;
  }
  private createAddReviewForm() {
    this.AddReviewFormGroup = new FormGroup({
      ProductId : new FormControl(null),
      UserName: new FormControl(null),
      Review: new FormControl(null, [Validators.required]),
      Rate: new FormControl(5.0, [Validators.required])
    });
  }

  private addItemToWishlist() {
    this.accountService.addItemToWishlist(this.product);
  }


  private loadProduct() {
    // tslint:disable-next-line: deprecation
    this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(product => {
      this.product = product;
      this.bcService.set('@productDetails', product.name);
    // tslint:disable-next-line: no-shadowed-variable
    }, error => {
      console.log(error);
    });
  }
  async loadProductRating() {
    this.shopService.getProductRating(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(rating => {
      this.productRating = rating;
    });
  }

  private openModal(template: TemplateRef<any>) {
    this.compareProduct = null;
    const config: ModalOptions = {class: 'modal-xl'};
    this.modalRef = this.modalService.show(template, config);
 }

  private addToCart() {
    this.basketService.addItemToBasket(this.product, this.quantity);
    this.router.navigateByUrl('/basket');
  }

  private incrementQuantity() {
    if (this.quantity < 3) {
      this.quantity++;
    }
  }
  private OnSubmit() {
    this.currentUser$.subscribe((user: IUser) => {
      this.AddReviewFormGroup.patchValue({
        ProductId: this.product.id,
        UserName: user.displayName,
        Rate: this.Ratingvalue
      });
    });

    this.shopService.addProductReview(this.AddReviewFormGroup.value).subscribe((review: IReviews) => {
      this.reviewed = true;
    });
  }

  private decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  async loadReviews() {
    this.shopService.getProductReviews(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(Response => {
      this.reviews = [...Response];
    });
  }

  private getProducts() {
    // tslint:disable-next-line: deprecation
    this.shopService.getProducts(this.shopParams).subscribe(Response => {
      this.products = Response.data;
      this.shopParams.pageNumber = Response.pageIndex;
      this.shopParams.pageSize = Response.pageSize;
      this.totalCount = Response.count;
    // tslint:disable-next-line: no-shadowed-variable
    }, error => {
      console.log(error);
    });
  }

  private getCompareProduct(id: number) {
    this.shopService.getProduct(id).subscribe(product => {
        this.compareProduct = product;
      }, error => {
        console.log(error);
    });
  }

}
