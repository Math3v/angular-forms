import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, OnChanges, OnInit, Input } from '@angular/core';

@Directive({
  selector: 'input[min]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MinValidatorDirective,
    multi: true
  }]
})
export class MinValidatorDirective implements Validator {

  @Input() min: number;

  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} {
    if( control.value && control.value > this.min ) {
      return null;
    } else {
      return { 'min': `Must be at least ${this.min}` }
    }
  }
}
