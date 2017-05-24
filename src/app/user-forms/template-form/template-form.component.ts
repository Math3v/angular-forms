import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../../models/User';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  user: User;

  userForm: NgForm;

  constructor() { }

  ngOnInit() {
    this.user = {
      name: '',
      address: {
        street: '',
        number: 42
      },
      password: '',
      passwordConfirmation: ''
    }
  }

}
