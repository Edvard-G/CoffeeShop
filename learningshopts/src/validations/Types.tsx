export interface Product {
  id: number;
  country: string;
  altitude: string;
  roasted: Date;
  region: string;
  variety: string;
  process: string;
  price: number;
}

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  dateOfBirth?: Dates;
  gender?: string;
  role?: string;
}

type Dates = {
  day: number;
  month: number;
  year: number;
};

