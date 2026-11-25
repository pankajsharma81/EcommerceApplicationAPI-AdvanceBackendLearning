export interface ProductResponse {
  id: string;
  userId: string;
  categoryId: string;
  name: string;
  description: string | null;
  imageUrls: string[];
  price: number;
  stock: number;
  isActive: boolean;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
