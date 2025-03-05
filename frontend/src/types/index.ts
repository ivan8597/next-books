export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

export interface Review {
  bookId: number;
  rating: number;
  comment: string;
}