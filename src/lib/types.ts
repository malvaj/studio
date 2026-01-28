export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageHint: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
}
