import { Component, OnInit, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import {Router} from '@angular/router';
import {Meteor} from 'meteor/meteor';

import template from './logindialog.component.html';
import style from './logindialog.component.scss';

@Component({
  selector: 'login-dialog',
  template: template,
  styles: [style]
})
export class LoginDialog implements OnInit {
  private loginForm: FormGroup;
  error: string;

  constructor(private router: Router,
              private zone: NgZone,
              private formBuilder: FormBuilder,
              public dialogRef: MdDialogRef<LoginDialog>) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.error = '';
  }

  login() {
    if (this.loginForm.valid) {
      Meteor.loginWithPassword(this.loginForm.value.email, this.loginForm.value.password, (err) => {
        this.zone.run(() => {
          if (err) {
            this.error = err;
            console.error(this.error);
            alert(this.error);
          } else {
            //this.router.navigate(['/listings']);
            this.dialogRef.close('loginSuccess');
          }
        });
      });
    }
  }

  loginWithFacebook() {
    Meteor.loginWithFacebook({ requestPermissions: ['public_profile', 'email'] }, (err) => {
        this.zone.run(() => {
            if (err) {
                this.error = err;
            } else {
              //this.router.navigate(['/listings']);
              this.dialogRef.close();
            }
        });
    });
    }
}
