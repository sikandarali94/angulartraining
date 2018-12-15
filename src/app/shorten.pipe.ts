/* .pipe.ts is the extension we should give to our file where we create a custom pipe.
 */
import {Pipe, PipeTransform} from '@angular/core';

/* We need to implement the @Pipe decorator to set the name of the pipe (that will be used in the template) as well as other metadata.
 */
@Pipe({
  name: 'shorten'
})

/* While not neccessary, we should implement the interface PipeTransform that forces us to implement a method that is required to make this
pipe usable as a pipe.
The ShortenPipe would get a value and output the first 10 characters of the value.
In this case, we want the user to specify to how many characters they want to shorten a value to.
 */
export class ShortenPipe implements PipeTransform {
  /* transform() is the required method to make this pipe usable as a pipe. The first argument is the value the pipe receives and the
  second argument is the arguments the pipe receives. In our case we don't enter any arguments into the shorten pipe so we don't
  need to implement the second argument of our transform method.
  transform() always needs to return something because a pipe returns a transformed output.
   */
  /* The second argument is the parameters the pipe will receive. The only parameter/argument we want to receive is to how many characters
  the user wants to shorten the value to. We store this parameter/argument in the limit variable.
   */
  transform(value: any, limit: number) {
    if (value.length > limit) {
      return value.substr(0, limit) + ' ...';
    }
    return value;
  }
}
