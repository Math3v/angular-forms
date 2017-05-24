import { Validator, AbstractControl, NG_VALIDATORS, NgForm } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[equalToControl]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EqualToDirective,
    multi: true
  }]
})
export class EqualToDirective implements Validator {

  @Input() equalToControl: NgForm;

  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} {
    let passwordControl: AbstractControl = this.getControl('password');
    let passwordConfirmControl: AbstractControl = this.getControl('passwordConfirmation');

    if( this.valuesEqual(passwordControl, passwordConfirmControl) ) {
      let controlToUpdate = this.shouldUpdate(passwordControl, passwordConfirmControl);
      if( controlToUpdate ) {
        controlToUpdate.setValue( controlToUpdate.value );
      }
      return null;
    } else {
      return { 'equalToControl': false };
    }
  }

  private getControl(controlName: string): AbstractControl {
    return this.equalToControl.controls[controlName];
  }

  private valuesEqual(a: AbstractControl, b: AbstractControl): boolean {
    return a.value && b.value && a.value === b.value;
  }

  private shouldUpdate(a: AbstractControl, b: AbstractControl): AbstractControl {
    if( a.invalid && b.valid ) {
      return a;
    } else if( a.valid && b.invalid) {
      return b;
    }

    return undefined;
  }
}
