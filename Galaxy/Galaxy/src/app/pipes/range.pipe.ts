import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range'
})
export class RangePipe implements PipeTransform {

  transform(number: number): number[] {
    return new Array(number).fill(0).map((n, index) => index + 1);
  }

}
