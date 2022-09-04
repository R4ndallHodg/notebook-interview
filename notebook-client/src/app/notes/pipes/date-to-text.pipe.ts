import { Pipe, PipeTransform } from '@angular/core';

// Pipe used to map a date to long text
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
