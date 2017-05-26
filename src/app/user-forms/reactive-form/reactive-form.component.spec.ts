import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormComponent } from './reactive-form.component';

describe('ReactiveFormComponent', () => {
  let component: ReactiveFormComponent;
  let fixture: ComponentFixture<ReactiveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        ReactiveFormComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('builds form correctly', () => {
    let form: FormGroup = component.buildForm();

    expect( form.get('name') ).toBeTruthy();
    expect( form.get('address').get('street') ).toBeTruthy();
    expect( form.get('address').get('number') ).toBeTruthy();
    expect( form.get('passwords').get('password') ).toBeTruthy();
    expect( form.get('passwords').get('passwordConfirmation') ).toBeTruthy();
  });

  it('validates password mismatch', () => {
    component.userForm = component.buildForm();

    let passwordControl = component.userForm.get('passwords').get('password');
    let passwordConfirmationControl = component.userForm.get('passwords').get('passwordConfirmation');

    passwordControl.setValue('asd456AD');
    passwordControl.markAsDirty();

    passwordConfirmationControl.setValue('asd456AE');
    passwordConfirmationControl.markAsDirty();

    component.validateControls( component.userForm.controls );
    expect( component.formErrors['passwords'] ).toMatch('must match');
  });

  it('validates password match', () => {
    component.userForm = component.buildForm();

    let passwordControl = component.userForm.get('passwords').get('password');
    let passwordConfirmationControl = component.userForm.get('passwords').get('passwordConfirmation');

    passwordControl.setValue('asd456AD');
    passwordControl.markAsDirty();

    passwordConfirmationControl.setValue('asd456AD');
    passwordConfirmationControl.markAsDirty();

    component.validateControls( component.userForm.controls );
    expect( Object.keys(component.formErrors).length ).toBe(0);
  });
});
