import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TemplateFormComponent } from './template-form/template-form.component';
import { MinValidatorDirective } from './min-validator.directive';
import { MaxValidatorDirective } from './max-validator.directive';
import { EqualToDirective } from './equal-to.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TemplateFormComponent,
    MinValidatorDirective,
    MaxValidatorDirective,
    EqualToDirective
  ],
  exports: [
    TemplateFormComponent
  ]
})
export class UserFormsModule { }
