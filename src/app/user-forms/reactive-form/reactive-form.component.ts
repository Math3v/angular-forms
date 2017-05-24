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
      return { 'min': `Number must be less than ${max}` }
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
          minValidatorFactory(5)
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
      console.log( control );
      if( control.constructor.name === 'FormGroup' ) {
        this.checkControls( control.controls );
      } else {
        delete this.formErrors[controlName];
        if( control && control.touched && !control.valid ) {
          console.log( control.errors );
        }
      }
    }
  }
}
