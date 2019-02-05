import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'AgeCounter'
})
export class CustomPipePipe implements PipeTransform {

  transform(Birthday: string): number {
    const StudYear = +Birthday.slice(-4);
    return 2019 - StudYear;
  }
}
