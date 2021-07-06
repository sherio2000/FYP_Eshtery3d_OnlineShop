import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { ReplaySubject } from 'rxjs';
import { IAdmin } from 'src/app/shared/models/IAdmin';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  @ViewChild('sidebar', {static: false}) private sidebar: SidebarComponent;
  public animate = false;
  public enableRtl = true;
  public width = '290px';
  public type = 'Push';

  public add_product = false;
  public delete_product = false;
  // tslint:disable-next-line: variable-name

  public add_product_color = false;
  public delete_product_color = false;

  public add_product_type = false;
  public delete_product_type = false;

  public add_product_category = false;
  public delete_product_category = false;

  public add_product_brand = false;
  public delete_product_brand = false;

  public add_delivery_method = false;
  public delete_delivery_method = false;

  public delete_orders = false;


  public dashboard = true;

  private productSubSideBarToggle = false;
  private productColorSubSideBarToggle = false;
  private productCategorySubSideBarToggle = false;
  private productTypesSubSideBarToggle = false;
  private usersSubSideBarToggle = false;
  private productBrandSubSideBarToggle = false;
  private orderSubSideBarToggle = false;
  private deliveryMethodSubSideBarToggle = false;


  private currentUserSource = new ReplaySubject<IAdmin>(1);
  public onCreated(args: any) {
      this.sidebar.element.style.visibility = '';
  }
  constructor(private router: Router) { }

  ngOnInit() {
    this.resetPages();
  }

  private closeClick(): void {
    this.sidebar.hide();
  };

  private toggleClick(): void {
    this.sidebar.show();
  }

  private toggleProductSubSideBar() {
    if (this.productSubSideBarToggle === false) {
      this.productSubSideBarToggle = true;
    } else {
      this.productSubSideBarToggle = false;
    }
  }

  private toggleProductColorSubSideBar() {
    if (this.productColorSubSideBarToggle === false) {
      this.productColorSubSideBarToggle = true;
    } else {
      this.productColorSubSideBarToggle = false;
    }
  }

  private toggleDeliveryMethodsSubSideBar() {
    if (this.deliveryMethodSubSideBarToggle === false) {
      this.deliveryMethodSubSideBarToggle = true;
    } else {
      this.deliveryMethodSubSideBarToggle = false;
    }
  }

  private toggleOrderSubSideBar() {
    if (this.orderSubSideBarToggle === false) {
      this.orderSubSideBarToggle = true;
    } else {
      this.orderSubSideBarToggle = false;
    }
  }


  private toggleProductCategorySubSideBar() {
    if (this.productCategorySubSideBarToggle === false) {
      this.productCategorySubSideBarToggle = true;
    } else {
      this.productCategorySubSideBarToggle = false;
    }
  }

  private toggleProductTypesSubSideBar() {
    if (this.productTypesSubSideBarToggle === false) {
      this.productTypesSubSideBarToggle = true;
    } else {
      this.productTypesSubSideBarToggle = false;
    }
  }

  private toggleProductBrandsSubSideBar() {
    if (this.productBrandSubSideBarToggle === false) {
      this.productBrandSubSideBarToggle = true;
    } else {
      this.productBrandSubSideBarToggle = false;
    }
  }

  private toggleUsersSubSideBar() {
    if (this.usersSubSideBarToggle === false) {
      this.usersSubSideBarToggle = true;
    } else {
      this.usersSubSideBarToggle = false;
    }
  }

  private resetPages() {
    this.dashboard = true;

    this.add_product = false;
    this.delete_product = false;

    this.add_product_category = false;
    this.delete_product_category = false;

    this.add_product_type = false;
    this.delete_product_type = false;

    this.delete_orders = false;

    this.add_delivery_method = false;
    this.delete_delivery_method = false;

    this.add_product_brand = false;
    this.delete_product_brand = false;

    this.add_product_color = false;
    this.delete_product_color = false;
  }
  
  private openAddProductPage() {
    this.dashboard = false;

    this.add_product = true;
    this.delete_product = false;

    this.add_product_category = false;
    this.delete_product_category = false;

    this.add_product_type = false;
    this.delete_product_type = false;

    this.delete_orders = false;

    this.add_delivery_method = false;
    this.delete_delivery_method = false;

    this.add_product_brand = false;
    this.delete_product_brand = false;

    this.add_product_color = false;
    this.delete_product_color = false;
  }

  private openUpdateProductPage() {
    this.dashboard = false;

    this.add_product = false;
    this.delete_product = false;

    this.add_product_category = false;
    this.delete_product_category = false;

    this.add_product_type = false;
    this.delete_product_type = false;

    this.delete_orders = false;

    this.add_delivery_method = false;
    this.delete_delivery_method = false;

    this.add_product_brand = false;
    this.delete_product_brand = false;

    this.add_product_color = false;
    this.delete_product_color = false;
  }

  private openDeleteProductPage() {
    this.dashboard = false;

    this.add_product = false;
    this.delete_product = true;

    this.add_product_category = false;
    this.delete_product_category = false;

    this.add_product_type = false;
    this.delete_product_type = false;

    this.delete_orders = false;

    this.add_delivery_method = false;
    this.delete_delivery_method = false;

    this.add_product_brand = false;
    this.delete_product_brand = false;

    this.add_product_color = false;
    this.delete_product_color = false;
  }

  private openAddProductColorPage() {
    this.dashboard = false;

    this.add_product = false;
    this.delete_product = false;

    this.add_product_category = false;
    this.delete_product_category = false;

    this.add_product_brand = false;
    this.delete_product_brand = false;

    this.delete_orders = false;

    this.add_delivery_method = false;
    this.delete_delivery_method = false;

    this.add_product_type = false;
    this.delete_product_type = false;

    this.add_product_color = true;
    this.delete_product_color = false;
  }
  private openUpdateProductColorPage() {
    this.dashboard = false;
    this.add_product = false;
    this.delete_product = false;

    this.add_product_category = false;
    this.delete_product_category = false;

    this.add_product_type = false;
    this.delete_product_type = false;

    this.delete_orders = false;

    this.add_delivery_method = false;
    this.delete_delivery_method = false;

    this.add_product_brand = false;
    this.delete_product_brand = false;

    this.add_product_color = false;
    this.delete_product_color = false;
  }

  private openDeleteProductColorPage() {
    this.dashboard = false;

    this.add_product = false;
    this.delete_product = false;

    this.add_product_category = false;
    this.delete_product_category = false;

    this.add_product_type = false;
    this.delete_product_type = false;

    this.delete_orders = false;

    this.add_delivery_method = false;
    this.delete_delivery_method = false;

    this.add_product_brand = false;
    this.delete_product_brand = false;

    this.add_product_color = false;
    this.delete_product_color = true;
  }

  private openAddProductCategoryPage() {
    this.dashboard = false;

    this.add_product = false;
    this.delete_product = false;

    this.add_product_category = true;
    this.delete_product_category = false;

    this.add_product_type = false;
    this.delete_product_type = false;

    this.delete_orders = false;

    this.add_delivery_method = false;
    this.delete_delivery_method = false;

    this.add_product_brand = false;
    this.delete_product_brand = false;

    this.add_product_color = false;
    this.delete_product_color = false;
  }

  private openUpdateProductCategoryPage() {
    this.dashboard = false;

    this.add_product = false;
    this.delete_product = false;

    this.add_product_category = false;
    this.delete_product_category = false;

    this.delete_orders = false;

    this.add_delivery_method = false;
    this.delete_delivery_method = false;

    this.add_product_brand = false;
    this.delete_product_brand = false;

    this.add_product_type = false;
    this.delete_product_type = false;

    this.add_product_color = false;
    this.delete_product_color = false;
  }

  private openDeleteProductCategoryPage() {
    this.dashboard = false;

    this.add_product = false;
    this.delete_product = false;

    this.add_product_category = false;
    this.delete_product_category = true;

    this.add_product_brand = false;
    this.delete_product_brand = false;

    this.delete_orders = false;

    this.add_delivery_method = false;
    this.delete_delivery_method = false;

    this.add_product_type = false;
    this.delete_product_type = false;

    this.add_product_color = false;
    this.delete_product_color = false;
  }

  private openAddProductTypePage() {
    this.dashboard = false;

    this.add_product = false;
    this.delete_product = false;

    this.add_product_category = false;
    this.delete_product_category = false;

    this.add_product_type = true;
    this.delete_product_type = false;

    this.delete_orders = false;

    this.add_delivery_method = false;
    this.delete_delivery_method = false;

    this.add_product_brand = false;
    this.delete_product_brand = false;

    this.add_product_color = false;
    this.delete_product_color = false;
  }
  private openAddProductBrandPage() {
    this.dashboard = false;

    this.add_product = false;
    this.delete_product = false;

    this.add_product_category = false;
    this.delete_product_category = false;

    this.add_product_type = false;
    this.delete_product_type = false;

    this.delete_orders = false;

    this.add_delivery_method = false;
    this.delete_delivery_method = false;

    this.add_product_brand = true;
    this.delete_product_brand = false;

    this.add_product_color = false;
    this.delete_product_color = false;
  }

  private openDeleteProductBrandPage() {
    this.dashboard = false;

    this.add_product = false;
    this.delete_product = false;

    this.add_product_category = false;
    this.delete_product_category = false;

    this.add_product_type = false;
    this.delete_product_type = false;

    this.add_product_brand = false;
    this.delete_product_brand = true;

    this.delete_orders = false;

    this.add_delivery_method = false;
    this.delete_delivery_method = false;

    this.add_product_color = false;
    this.delete_product_color = false;
  }

  private openUpdateProductTypePage() {
    this.dashboard = false;

    this.add_product = false;
    this.delete_product = false;

    this.add_product_category = false;
    this.delete_product_category = false;

    this.add_product_type = false;
    this.delete_product_type = false;

    this.delete_orders = false;

    this.add_delivery_method = false;
    this.delete_delivery_method = false;

    this.add_product_brand = false;
    this.delete_product_brand = false;

    this.add_product_color = false;
    this.delete_product_color = false;
  }
  private openDeleteProductTypePage() {
    this.dashboard = false;

    this.add_product = false;
    this.delete_product = false;

    this.add_product_category = false;
    this.delete_product_category = false;

    this.add_product_brand = false;
    this.delete_product_brand = false;

    this.delete_orders = false;

    this.add_delivery_method = false;
    this.delete_delivery_method = false;

    this.add_product_type = false;
    this.delete_product_type = true;

    this.add_product_color = false;
    this.delete_product_color = false;
  }

  private openDashboard() {
    this.dashboard = true;

    this.add_product = false;
    this.delete_product = false;

    this.add_product_category = false;
    this.delete_product_category = false;

    this.add_product_type = false;
    this.delete_product_type = false;

    this.add_product_brand = false;
    this.delete_product_brand = false;

    this.delete_orders = false;

    this.add_delivery_method = false;
    this.delete_delivery_method = false;

    this.add_product_color = false;
    this.delete_product_color = false;
  }

  private openDeleteDeliveryMethod() {
    this.dashboard = false;

    this.add_product = false;
    this.delete_product = false;

    this.add_product_category = false;
    this.delete_product_category = false;

    this.add_product_type = false;
    this.delete_product_type = false;

    this.delete_orders = false;

    this.add_delivery_method = false;
    this.delete_delivery_method = true;

    this.add_product_brand = false;
    this.delete_product_brand = false;

    this.add_product_color = false;
    this.delete_product_color = false;
  }

  private openAddDeliveryMethodPage() {
    this.dashboard = false;

    this.add_product = false;
    this.delete_product = false;

    this.add_product_category = false;
    this.delete_product_category = false;

    this.add_product_type = false;
    this.delete_product_type = false;

    this.delete_orders = false;

    this.add_delivery_method = true;
    this.delete_delivery_method = false;

    this.add_product_brand = false;
    this.delete_product_brand = false;

    this.add_product_color = false;
    this.delete_product_color = false;
  }

  private openDeleteOrderPage() {
    this.dashboard = false;

    this.add_product = false;
    this.delete_product = false;

    this.add_product_category = false;
    this.delete_product_category = false;

    this.add_product_type = false;
    this.delete_product_type = false;

    this.delete_orders = true;

    this.add_delivery_method = false;
    this.delete_delivery_method = false;

    this.add_product_brand = false;
    this.delete_product_brand = false;

    this.add_product_color = false;
    this.delete_product_color = false;
  }
  private Logout() {
    localStorage.removeItem('admin_token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }
}
