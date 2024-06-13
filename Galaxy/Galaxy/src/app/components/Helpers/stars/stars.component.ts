import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.css'
})
export class StarsComponent {
  @Input() Stars: number = 3;

  floorNumber(value: number): number {
    return Math.floor(value);
  }
  
  ceilNumber(value: number): number {
    return Math.ceil(value);
  }
  
  isDecimal(value: number): boolean {
    return value % 1 !== 0;
  }

  convertToRound(decimal:number) {
    return Math.round(decimal);
  }
  
  
}
