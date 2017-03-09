import { Component, OnInit, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import {Router} from '@angular/router';
import {Meteor} from 'meteor/meteor';

import template from './signupdialog.component.html';
import style from './signupdialog.component.scss';

@Component({
  selector: 'signup-dialog',
  template: template,
  styles: [style]
})
export class SignupDialog implements OnInit {
  user: Meteor.User;
  signupForm: FormGroup;
  error: string;

  constructor(private router: Router,
              private zone: NgZone,
              private formBuilder: FormBuilder,
              public dialogRef: MdDialogRef<SignupDialog>) {}
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      displayname: ['', Validators.required]
    });

    this.error = '';
  }

  signup() {
    if (this.signupForm.valid) {
      var options = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        profile: {
          displayname: this.signupForm.value.displayname
        }
      }
      Accounts.createUser(options, (err) => {
        if (err) {
          this.error = err;
        } else {

          Meteor.call('sendVerificationLink', (err, response) => {
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
      });
    }
  }

  loginWithFacebook() {
    Meteor.loginWithFacebook({ requestPermissions: ['public_profile', 'email'], loginStyle: 'popup' }, (err) => {
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
