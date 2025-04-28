import { Audit } from "./audit";

export interface Actor extends Audit {
    id: number;
    imdbId: string;
    fullName: string;
    primaryImage: string;
    height: number;
    bio: string;
    birthDate: Date;
  }