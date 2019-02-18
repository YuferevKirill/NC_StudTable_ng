import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageConverter'
})
export class AgeConverterPipe implements PipeTransform {

  transform(Birthday: string): number {
    const StudYear = +Birthday.slice(-4);
    return 2019 - StudYear;
  }

}
