export interface BookPreview {
  image?: { url: string };
  rating?: number;
  title: string;
  authors?: string[];
  issueYear?: string;
  id: number;
  categories?: string[];
  booking?: Booking;
  delivery?: Delivery;
  histories?: History[];
}

interface Booking {
  id: number;
  order: boolean;
  dateOrder?: string;
  customerId?: number;
  customerFirstName?: string;
  customerLastName?: string;
}

interface Delivery {
  id: number;
  handed: boolean;
  dateHandedFrom?: string;
  dateHandedTo?: string;
  recipientId?: number;
  recipientFirstName?: string;
  recipientLastName?: string;
}

interface History {
  id?: number;
  userId?: number;
}
