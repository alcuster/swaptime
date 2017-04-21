import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from "rxjs";
import { Meteor } from 'meteor/meteor';
import { MeteorObservable, ObservableCursor } from "meteor-rxjs";
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { MdDialog, MdDialogRef } from '@angular/material';
import { SelectItem, Messages, Message } from 'primeng/primeng';

import { ListingService } from '../listings/listing.service';
import { Listing } from "../../../../both/models/listing.model";
import { ListingsCollection } from "../../../../both/collections/listings.collection";
import { Spring2017 } from '../../../../both/collections/spring2017.collection';

import { LoginDialog } from '../auth/logindialog.component';
import { SignupDialog } from '../auth/signupdialog.component';

import { Departments } from './departments.model';
import { Days } from './days.model';
import { Times } from './times.model';
import { LabDays } from './labdays.model';
import { LabTimes } from './labtimes.model';

import template from './submit.component.html';
import style from './submit.component.scss';

@Component({
  selector: 'app-submit',
  template,
  styles: [style]
})
@InjectUser('user')
export class SubmitComponent implements OnInit {
  private msgs: Message[] = [];
  private courses: any; //bad...
  private filteredCourses: any;
  private departments: SelectItem[] = new Departments().departments;
  private times: SelectItem[] = new Times().times;
  private days: Days = new Days();
  private labtimes: SelectItem[] = new Times().times;
  private labdays: Days = new Days();

  private addForm: FormGroup;
  private dataAvailable: boolean = false;
  private hasLab: boolean = false;
  private errorMessage: string;
  private davidsonLink: string;

  constructor(private listingService: ListingService,
              private router: Router,
              private formBuilder: FormBuilder,
              private ngZone: NgZone,
              public dialog: MdDialog) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      department: ['', Validators.required],
      courseNumber: ['', Validators.required],
      days: ['', Validators.required],
      time: ['', Validators.required],
      labdays: '',
      labtime: '',
      fullTitle: ['', Validators.required],
      type: ['', Validators.required],
      section: '',
      description: ''
    });
    this.getCourses();
    this.msgs.push({severity:'info', summary:'Heads up!', detail:"You'll need to log in before you can submit a listing."});
  }

  getCourses(): void {
    Meteor.call('getCourses', (err, result) => this.ngZone.run(() => {
      if (err) {
        this.errorMessage = "Error loading courses database.";
        console.error('error', err);
      } else {
        this.courses = result;
        this.dataAvailable = true;
      }
    }));
  }

  filterCourses(event) {
    this.filteredCourses = [];
    for (let i = 0; i < this.courses.length; i++) {
      let c = this.courses[i];

      if (c.title.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        if (c.section != "0") {
          c.sectionTitle = c.title + " (" + c.section + ")";
          c.listingSection = c.section;
        } else {
          c.sectionTitle = c.title;
          c.listingSection = '';
        }
        this.filteredCourses.push(c);
      }
    }
  }

  handleSelect(value) {
    if (value.lab_days) {
      this.hasLab = true;
      this.addForm.setValue({department: value.subj,
                             courseNumber: value.cnum,
                             days: value.days,
                             time: value.time,
                             labdays: value.lab_days,
                             labtime: value.lab_time,
                             fullTitle: value.title,
                             section: value.listingSection,
                             type: '',
                             description: ''
                           });
    } else {
      this.hasLab = false;
      this.addForm.setValue({department: value.subj,
                             courseNumber: value.cnum,
                             days: value.days,
                             time: value.time,
                             labdays: '',
                             labtime: '',
                             fullTitle: value.title,
                             section: value.listingSection,
                             type: '',
                             description: ''
                           });
    }
    this.davidsonLink = 'https://www.davidson.edu/general-course-detail/?subj=' + value.subj + '&cnum=' + value.cnum;
  }

  submitListing(): void {
    if (!Meteor.userId()) {
      alert('You must be logged in to submit a new listing.');
      return;
    }

    if (this.addForm.valid) {
      const newListing: Listing = Object.assign({},
                                                this.addForm.value,
                                                { ownerName: Meteor.user().profile.displayname,
                                                  createdAt: new Date() }
                                              );
      MeteorObservable.call('addListing', newListing).subscribe(() => {
        this.addForm.reset();
        let link = ['/listings'];
        this.router.navigate(link);
      }, (error) => {
        console.error('Error: ', error);
        alert(error.reason);
      });

    }
  }

  openLoginDialog() {
    let dialogRef = this.dialog.open(LoginDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'loginSuccess') {
        window.location.reload();
      }
      if (result == 'signup') {
        this.openSignupDialog();
      }
    });
  }

  openSignupDialog() {
    let dialogRef = this.dialog.open(SignupDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'signupSuccess') {
        window.location.reload();
      }
      if (result == 'login') {
        this.openLoginDialog();
      }
    });
  }

  logout() {
    Meteor.logout();
  }

}
