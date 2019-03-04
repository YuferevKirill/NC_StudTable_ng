import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ageConverter'
})
export class AgeConverterPipe implements PipeTransform {

  transform(date: string): number {
    const currentYear = new Date().getFullYear();
    const dateOfBirth = date.split('-');
    const studYear = +dateOfBirth[0];

    return currentYear - studYear;
  }
}
