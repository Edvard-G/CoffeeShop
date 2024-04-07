export interface ProductAttributes {
  id: number;
  country: string;
  altitude: string;
  roasted: Date;
  region: string;
  variety: string;
  process: string;
  price: number;
}

export interface UserAttributes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  date_of_birth?: Date;
  gender?: string;
  role?: string;
}

export interface CartAttributes{
  id: number;
  userId: number;
  totalPrice: number;
}

export interface CartProductAttributes{
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  price: number;
}