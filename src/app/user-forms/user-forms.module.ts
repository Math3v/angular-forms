import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TemplateFormComponent } from './template-form/template-form.component';
import { MinValidatorDirective } from './min-validator.directive';
import { MaxValidatorDirective } from './max-validator.directive';
import { EqualToDirective } from './equal-to.directive';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TemplateFormComponent,
    MinValidatorDirective,
    MaxValidatorDirective,
    EqualToDirective,
    ReactiveFormComponent
  ],
  exports: [
    TemplateFormComponent,
    ReactiveFormComponent
  ]
})
export class UserFormsModule { }
