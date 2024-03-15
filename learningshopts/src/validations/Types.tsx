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
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
  confirm_password?: string;
  date_of_birth?: Dates;
  gender?: string;
  role?: string;
}

type Dates = {
  day: number;
  month: number;
  year: number;
};

