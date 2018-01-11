import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0) {
      return value;
    }

    const result = [];
    for (const item of value) {
      if (item[propName].indexOf(filterString) !== -1) {
        result.push(item);
      }
    }
    return result;
  }
}
