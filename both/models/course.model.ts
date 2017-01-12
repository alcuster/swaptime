import { CollectionObject } from './collection-object.model';

export interface Course extends CollectionObject {
  crn: number;
  subj: string;
  cnum: number;
  section;
  title: string;
  days: string;
  time: string;
  cap: number;
  act: number;
  rem: number;
  wl_cap: number;
  wl_act: number;
  wl_rem: number;
  xl_cap: number;
  xl_act: number;
  xl_rem: number;
  instructor: string;
  location: string;
  distreq: string;
  notes: string;
  lab_days: string;
  lab_time: string
}
