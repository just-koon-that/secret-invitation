export interface Comment {
  id: string;
  author: string;
  comment: string;
  likes?: number;
  createdAt: number;
  updatedAt: number;
}
