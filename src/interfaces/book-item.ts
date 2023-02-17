import { BookPreview } from './book-preview';

export interface BookItem extends BookPreview {
  description?: string;
  publish?: string;
  pages?: string;
  cover?: string;
  weight?: string;
  format?: string;
  ISBN?: string;
  producer?: string;
  comments?: Comment[];
  images?: Image[];
}

export interface Image {
  url: string;
}

export interface Comment {
  id: number;
  rating: number;
  text?: string;
  createdAt: string;
  user: User;
}

export interface User {
  commentUserId: number;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}
