import { CollectionObject } from './collection-object.model';

export interface Listing extends CollectionObject {
  department: string;
  courseNumber: string;
  days: string;
  time: string;
  labdays?: string;
  labtime?: string;
  fullTitle: string;
  description: string;
  section?: string;
  type: "Offer" | "Request";
  owner?: string;
  ownerName?: string;
  createdAt: Date;
}
