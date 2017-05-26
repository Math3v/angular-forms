import { ValidatorFn } from '@angular/forms';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, OnInit, Input } from '@angular/core';
import { minValidatorFactory } from './custom-validators';

@Directive({
  selector: 'input[min]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MinValidatorDirective,
    multi: true
  }]
})
export class MinValidatorDirective implements Validator, OnInit {

  @Input() min: number;

  validator: ValidatorFn;

  constructor() { }

  ngOnInit() {
    this.validator = minValidatorFactory( this.min );
  }

  validate(control: AbstractControl): {[key: string]: any} {
    return this.validator( control );
  }
}
