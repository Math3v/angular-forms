import { User, emptyUser } from '../../models/User';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

function minValidatorFactory(min: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {

    if( control && control.value < min ) {
      return { 'min': `Number must be at least ${min}` }
    } else {
      return null;
    }
  };
}

function maxValidatorFactory(max: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {

    if( control && control.value > max ) {
      return { 'max': `Number must be less than ${max}` }
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  userForm: FormGroup;

  formErrors: object = {};

  user: User;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.user = emptyUser();
    this.userForm = this.fb.group({
      name: [this.user.name, Validators.required],
      address: this.fb.group({
        street: [this.user.address.street, [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[A-Za-z]{3,}')
        ]],
        number: [this.user.address.number, [
          Validators.required,
          minValidatorFactory(5),
          maxValidatorFactory(200)
        ]]
      })
    });
    
    this.userForm.valueChanges.subscribe(data => {
      this.checkControls( this.userForm.controls );
    });
  }

  private checkControls(controls): void {
    for( let controlName in controls ) {
      let control = controls[controlName];
      if( control.constructor.name === 'FormGroup' ) {
        this.checkControls( control.controls );
      } else {
        delete this.formErrors[controlName];
        if( control && control.dirty && !control.valid ) {
          this.updateFormErrors( controlName, control.errors );
        }
      }
    }
  }

  private updateFormErrors(controlName: string, controlErrors): void {
    this.formErrors[controlName] = this.getErrorMessage(controlName, controlErrors);
  }

  private getErrorMessage(controlName: string, errorObject: object): Array<string> {
    const errorMessages = {
      'name': {
        'required': 'Name is required'
      },
      'street': {
        'required': 'Street is required',
        'minlength': 'Street must be at least 3 characters long',
        'pattern': 'Must contain letters'
      },
      'number': {
        'required': 'Number is required',
        'min': 'Number must be at least 5',
        'max': 'Number must be less than 200'
      }
    };

    let errors = Object.keys( errorObject ).map(errorName => {
      return errorMessages[controlName][errorName];
    });

    return errors;
  }
}
