export interface BookPreview {
  image: { url: string } | null;
  rating: number;
  title: string;
  authors: string[];
  issueYear: string;
  id: number;
  categories: string[];
  booking: {
    id: number;
    order: boolean;
    dateOrder: string;
    customerId: number;
    customerFirstName: string;
    customerLastName: string;
  } | null;
  delivery: {
    id: number;
    handed: boolean;
    dateHandedFrom: string;
    dateHandedTo: string;
    recipientId: number;
    recipientFirstName: string;
    recipientLastName: string;
  } | null;
  histories: Array<{
    id: number;
    userId: number;
  }> | null;
}
