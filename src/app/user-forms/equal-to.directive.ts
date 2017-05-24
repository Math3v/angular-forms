import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
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

  @Input() equalToControl: AbstractControl;

  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} {
    let thisControl: AbstractControl = control;
    let thatControl: AbstractControl = this.equalToControl;

    if( this.valuesEqual(thisControl, thatControl) ) {
      let controlToUpdate = this.toUpdate(thisControl, thatControl);
      if( controlToUpdate ) {
        // TS Hack to access FormControl of AbstractControl
        ( controlToUpdate as any ).control.setValue( controlToUpdate.value );
      }
      return null;
    } else {
      return { 'equalToControl': 'Controls need to match' };
    }
  }

  private valuesEqual(a: AbstractControl, b: AbstractControl): boolean {
    return a.value && b.value && a.value === b.value;
  }

  private toUpdate(a: AbstractControl, b: AbstractControl): AbstractControl {
    if( a.invalid && b.valid ) {
      return a;
    } else if( a.valid && b.invalid) {
      return b;
    }

    return undefined;
  }
}
