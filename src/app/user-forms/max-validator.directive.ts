import { Validator, AbstractControl, NG_VALIDATORS, ValidatorFn } from '@angular/forms';
import { Directive, OnInit, Input } from '@angular/core';
import { maxValidatorFactory } from './custom-validators';

@Directive({
  selector: 'input[max]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MaxValidatorDirective,
    multi: true
  }]
})
export class MaxValidatorDirective implements Validator, OnInit {

  @Input() max: number;

  validator: ValidatorFn;

  constructor() { }

  ngOnInit() {
    this.validator = maxValidatorFactory( this.max );
  }

  validate(control: AbstractControl): {[key: string]: any} {
    return this.validator( control );
  }
}
