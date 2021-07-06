import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { IProduct } from 'src/app/shared/models/Iproduct';
import { ShopService } from '../../shop.service';

@Component({
  selector: 'app-product-compare',
  templateUrl: './product-compare.component.html',
  styleUrls: ['./product-compare.component.scss']
})
export class ProductCompareComponent implements OnChanges {

  @Input() private id;
  private compareProduct: IProduct;
  constructor(private shopService: ShopService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.getCompareProduct(changes.id.currentValue);
  }

  private getCompareProduct(id: number) {
    this.shopService.getProduct(id).subscribe(product => {
      this.compareProduct = product;
    }, error => {
      console.log(error);
    });
}

}
