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
    this.userForm = this.buildForm();
    this.userForm.valueChanges.subscribe( _ => {
      this.validateControls( this.userForm.controls );
    });
  }

  buildForm(): FormGroup {
    return this.fb.group({
      name: [this.user.name,
        Validators.required
      ],
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
  }

  validateControls(controls): void {
    Object.keys( controls ).map(controlName => {
      let control = controls[controlName];

      if( this.shouldNestDeeper(control) ) {
        this.validateControls( control.controls );
      } else {
        delete this.formErrors[controlName];
        if( this.hasErrors(control) ) {
          this.formErrors[controlName] = this.getErrorMessages(controlName, control.errors);
        }
      }
    });
  }

  private shouldNestDeeper(control: any): boolean {
    return control.constructor.name === 'FormGroup'
      && Object.keys( control.controls ).length > 0;
  }

  private hasErrors(control: any): boolean {
    return control && control.dirty && !control.valid;
  }

  private getErrorMessages(controlName: string, errorObject: object): Array<string> {
    const errorMessages = this.errorMessages();
    return Object.keys( errorObject ).map(errorName => {
      return errorMessages[controlName][errorName];
    });
  }

  private errorMessages(): object {
    return {
      'name': {
        'required': 'Name is required'
      },
      'street': {
        'required': 'Street is required',
        'minlength': 'Street must be at least 3 characters long',
        'pattern': 'Must contain only letters'
      },
      'number': {
        'required': 'Number is required',
        'min': 'Number must be at least 5',
        'max': 'Number must be less than 200'
      }
    };
  }
}
