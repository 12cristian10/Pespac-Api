export interface Product {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string | null;
    categoryId: number;
    fishermanDni: string;
    productDate: Date;
}