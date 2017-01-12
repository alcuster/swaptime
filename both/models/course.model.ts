import { CollectionObject } from './collection-object.model';

export interface Course extends CollectionObject {
  crn: number;
  subj: string;
  cnum: number;
  section;
  title: string;
  days: string;
  time: string;
  instructor: string;
  location: string;
  distreq: string;
  notes: string;
  lab_days: string;
  lab_time: string
}
