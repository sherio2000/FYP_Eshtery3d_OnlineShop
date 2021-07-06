import { Component,Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {
  @Input() private totalCount: number;
  @Input() private pageSize: number;
  @Output() private pageChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  private onPagerChange(event: any) {
    this.pageChanged.emit(event.page);
  }
}
