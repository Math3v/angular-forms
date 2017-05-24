import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, OnChanges, OnInit, Input } from '@angular/core';

@Directive({
  selector: 'input[max]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MaxValidatorDirective,
    multi: true
  }]
})
export class MaxValidatorDirective implements Validator {

  @Input() max: number;

  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} {
    if( control.value && control.value < this.max ) {
      return null;
    } else {
      return { 'max': `Must be less than ${this.max}` }
    }
  }
}
