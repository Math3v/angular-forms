import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EqualToDirective } from '../equal-to.directive';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TemplateFormComponent } from './template-form.component';

describe('TemplateFormComponent', () => {
  let component: TemplateFormComponent;
  let fixture: ComponentFixture<TemplateFormComponent>;
  let de: DebugElement;

  const inputEvent = new Event('input', {
    'bubbles': true,
    'cancelable': true
  }); 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        TemplateFormComponent,
        EqualToDirective
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFormComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('contains user form inputs', () => {
    expect( de.queryAll( By.css('input[name="name"]') ).length ).toBe(1);
    expect( de.queryAll( By.css('input[name="street"]') ).length ).toBe(1);
    expect( de.queryAll( By.css('input[name="number"]') ).length ).toBe(1);
    expect( de.queryAll( By.css('input[name="password"]') ).length ).toBe(1);
    expect( de.queryAll( By.css('input[name="passwordConfirmation"]') ).length ).toBe(1);
  });

  it('validates password mismatch', (done) => {
    fixture.whenStable().then(() => {
      de.query( By.css('input[name="password"') ).nativeElement.value = 'asd456AD';
      de.query( By.css('input[name="password"') ).nativeElement.dispatchEvent( inputEvent );
      de.query( By.css('input[name="passwordConfirmation"') ).nativeElement.value = 'asd456AE';
      de.query( By.css('input[name="passwordConfirmation"') ).nativeElement.dispatchEvent( inputEvent );

      fixture.detectChanges();
      expect( de.queryAll( By.css('.alert.alert-danger') ).length  ).toBe(2);
      done();
    });
  });

  it('validates password match', (done) => {
    fixture.whenStable().then(() => {
      de.query( By.css('input[name="password"') ).nativeElement.value = 'asd456AD';
      de.query( By.css('input[name="password"') ).nativeElement.dispatchEvent( inputEvent );
      de.query( By.css('input[name="passwordConfirmation"') ).nativeElement.value = 'asd456AD';
      de.query( By.css('input[name="passwordConfirmation"') ).nativeElement.dispatchEvent( inputEvent );

      fixture.detectChanges();
      expect( de.queryAll( By.css('.alert.alert-danger') ).length ).toBe(0);
      done();
    });
  });
});
