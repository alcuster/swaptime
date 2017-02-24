import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { InjectUser } from 'angular2-meteor-accounts-ui';

import template from './signup.component.html';
import animals from './animals.min';
import adjectives from './adjectives.min';

@Component({
  selector: 'signup',
  template
})
@InjectUser('user')
export class SignupComponent implements OnInit {
  user: Meteor.User;
  signupForm: FormGroup;
  error: string;
  displayname: string;
  private adjectives: string[] = adjectives;
  private animals: string[] = animals;

  constructor(private router: Router,
              private zone: NgZone,
              private formBuilder: FormBuilder) {}
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
      Accounts.createUser({
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        profile: {
          displayname: this.signupForm.value.displayname
        }
      }, (err) => {

          if (err) {
            this.error = err;
          } else {

            Meteor.call('sendVerificationLink', (err, response) => {
              this.zone.run(() => {
                if (err) {
                  this.error = err;
                } else {
                  this.router.navigate(['/listings']);
                }
              });
            });
          }

      });
    //end validation check
    }
  //end signup function
  }

  randomElem(list) {
    var randomEl = list[Math.floor(Math.random() * list.length)];
    return randomEl.charAt(0).toUpperCase() + randomEl.slice(1);
  }

  uniqueID(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  makeName(): void {
    this.displayname = this.randomElem(this.adjectives) + this.randomElem(this.animals);// + this.uniqueID();
  }
}
