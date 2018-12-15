/* We can create a pipe using the CLI by typing into the terminal: ng generate pipe pipe-name.
The shorthand way is: ng g p pipe-name.
Please note pipe-name is the name we want to give to the pipe so this could be anything we desire.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /* filterString argument will be the server status input that the user typed into the input.
   */
  transform(value: any, filterString: string): any {
    /* We want to return only the elements of the server array which have status of what is in filterString.
     */
    /* value is not always a string, it could also be a number, an array or any kind of data type.
     */
    if (value.length === 0 || filterString === '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item.status === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
