import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketItem } from '../../models/IBasket';
import { IOrderItem } from '../../models/order';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {

  @Output() private decrement: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() private increment: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() private remove: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Input() private isBasket = true;
  @Input() private items: IBasketItem[] | IOrderItem[] = [];
  @Input() private isOrder = false;

  constructor() { }

  ngOnInit() {
  }

  private decrementItemQuantity(item: IBasketItem) {
    this.decrement.emit(item);
  }

  private incrementItemQuantity(item: IBasketItem) {
    this.increment.emit(item);
  }

  private removeBasketItem(item: IBasketItem) {
    this.remove.emit(item);
  }

}
