export type Language = 'ar' | 'en';

export type CategoryId =
  | 'all'
  | 'tea'
  | 'saudi_coffee'
  | 'cold_drinks'
  | 'black_coffee'
  | 'bakery'
  | 'desserts'
  | 'other';

export interface Category {
  id: CategoryId;
  nameAr: string;
  nameEn: string;
  icon: string;
}

export interface CustomizationOption {
  nameAr: string;
  nameEn: string;
  price: number;
}

export interface CustomizationGroup {
  id: string;
  titleAr: string;
  titleEn: string;
  required?: boolean;
  options: CustomizationOption[];
}

export interface MenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
  category: CategoryId;
  descriptionAr: string;
  descriptionEn: string;
  badgeTextAr: string;
  badgeTextEn: string;
  badgeIcon: string;
  image: string;
  isFeatured?: boolean;
  originAr?: string;
  originEn?: string;
  customizations?: CustomizationGroup[];
}

export interface SelectedCustomization {
  groupId: string;
  optionNameAr: string;
  optionNameEn: string;
  price: number;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  selectedCustomizations: SelectedCustomization[];
  specialInstructions?: string;
  totalPrice: number;
}

export interface OrderDetails {
  orderId: string;
  orderType: 'dine-in' | 'takeaway';
  tableNumber?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string;
  paymentMethod: 'apple_pay' | 'card' | 'cash';
}
