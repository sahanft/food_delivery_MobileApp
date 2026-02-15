export class Item {
  itemName!: string;
  category!: string;
  description!: string;
  shopName!: string;
  price!: number;
  image!: string;
}

export class CartItem extends Item {
  size!: string;
  quantity!: number;
}

export class Order {
  address!: string;
  phoneNumber!: string;
  totalPrice!: number;
  items!: CartItem[];

  constructor(address: string, phoneNumber: string, totalPrice: number, cart: CartItem[]) {
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.totalPrice = totalPrice;
    this.items = cart.map((item) => ({
      itemName: item.itemName,
      category: item.category,
      description: item.description,
      shopName: item.shopName,
      price: item.price,
      image: item.image,
      size: item.size,
      quantity: item.quantity,
    }));
  }
}
