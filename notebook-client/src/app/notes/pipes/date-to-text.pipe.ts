import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToText',
})
export class DateToTextPipe implements PipeTransform {
  transform(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
