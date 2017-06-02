import { FormControl, FormGroup } from '@angular/forms';
import {
  minValidatorFactory,
  maxValidatorFactory,
  passwordValidatorFactory
} from './custom-validators';

describe('CustomValidators', () => {

  it('validates min', () => {
    let control: FormControl = new FormControl(100, minValidatorFactory(200));
    expect( control.valid ).toBe(false);
    expect( control.errors['min'] ).toBe('Number must be at least 200');
  });

  it('validates max', () => {
    let control: FormControl = new FormControl(200, maxValidatorFactory(100));
    expect( control.valid ).toBe(false);
    expect( control.errors['max'] ).toBe('Number must be less than 100');
  });

  xit('validates that passwords match', () => {
    let controlGroup: FormGroup = new FormGroup({
      passwordValue: new FormControl('foobar'),
      passwordCheck: new FormControl('foober')
    }, passwordValidatorFactory('passwordValue', 'passwordCheck'));

    expect( controlGroup.valid ).toBe(false);
    expect( controlGroup.errors['mismatch'] ).toBe( true );

    controlGroup.get('passwordValue').setValue('password');
    controlGroup.get('passwordCheck').setValue('password');

    expect( controlGroup.valid ).toBe(true);
    expect( controlGroup.errors ).toBeNull();
  });
});
