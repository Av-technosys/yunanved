export type CartAttribute = {
  attribute: string; 
  value: string;    
};

export type CartItem = {
  productId: string;
  sku?: string;
  slug: string;
  title: string;
  image: string;

  price: number;          
  originalPrice?: number; 

  quantity: number;

  attributes: CartAttribute[];

  addedAt: number;
};
