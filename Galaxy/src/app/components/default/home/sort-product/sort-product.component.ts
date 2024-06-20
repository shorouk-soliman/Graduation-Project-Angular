import { Component, EventEmitter, Input, Output, output } from '@angular/core';

@Component({
  selector: 'app-sort-product',
  templateUrl: './sort-product.component.html',
  styleUrl: './sort-product.component.css'
})
export class SortProductComponent {

  @Input() sort: string = 'default';
  @Input() limit: number = 30;

  @Output() changeSort = new EventEmitter<string>();
  @Output() changeLimit = new EventEmitter<number>();
  @Output() changeKeyword = new EventEmitter<string>();

  OnChangeSort(event: any) {
    this.changeSort.emit(event.target.value)
  };

  OnChangeLimit(event: any) {
    this.changeLimit.emit(event.target.value)
  };

  OnChangeKeyword(keyword: string) {
    this.changeKeyword.emit(keyword)
  };
  
  OnClearKeyword(keyword: string){
    if(keyword === '')
    this.changeKeyword.emit('')
  };

}