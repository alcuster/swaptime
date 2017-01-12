import { Component, OnInit, Input } from '@angular/core';
import { Listing } from "../../../../both/models/listing.model";
import { TruncatePipe } from '../shared/truncate.pipe';
import template from './course.component.html';
import * as moment from 'moment';

@Component({
  selector: 'app-course',
  template,
  styleUrls: ['./course.component.css'],
  host: {
    class: 'row'
  }
})
export class CourseComponent implements OnInit {
  @Input() listing: Listing;

  ngOnInit() {
  }

}
