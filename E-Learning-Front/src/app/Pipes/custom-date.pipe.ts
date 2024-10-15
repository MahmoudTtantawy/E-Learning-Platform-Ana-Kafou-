import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true
})
export class CustomDatePipe implements PipeTransform {


  private datePipe: DatePipe = new DatePipe('en-US');

  transform(value: any, format: string = 'MMM d, y'): any {
    return this.datePipe.transform(value, format);
  }
}
