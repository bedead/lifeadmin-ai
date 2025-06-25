export interface Card {
  id: string;
  cardholderName: string;
  bankName: string;
  cardType: 'Visa' | 'Mastercard' | 'Rupay' | 'Amex' | 'Other';
  cardNumber: string;
  expiry: string;
  cvv?: string;
  notes?: string;
  brandingColor?: string;
  createdAt: string;
  updatedAt: string;
} 