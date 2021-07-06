import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketTotals } from '../../models/IBasket';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit {
  @Input() private shippingPrice: number;
  @Input() private subtotal: number;
  @Input() private total: number;
  constructor(private basketService: BasketService) { }

  ngOnInit() {
  }

}
