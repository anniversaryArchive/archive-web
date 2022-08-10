type Archive_ = {
  _id: string;
  lat: number;
  lng: number;
  archiveName: string;
  themeName: string;
  organizer?: string;
  address: string;
  startDate: Date;
  endDate: Date;
  images?: Array<String>;
  phoneNumber?: string;
  link?: string;
};

export type Archive = Archive_;
