import ProductRepository from "../../infraestructure/repository/ProductRepository";
import { Product } from "../../domain/entities/Product";
import imageService from "../../infraestructure/images/imageService";
import { serviceConstants as constants } from "../../config/constans";

export async function createProduct(product: Product): Promise<Product | null> {
    return await ProductRepository.create(product);
}

export async function updateProduct(id: number, product: Product): Promise<Product | null> {
    return await ProductRepository.update(id, product);
}

export async function getProduct(id: number): Promise<Product | null> {
    return await ProductRepository.findById(id);
}

export async function getProducts(): Promise<Product[]> {
    return await ProductRepository.findAll();
}

export async function getProductByCategory(categoryId: number): Promise<Product[]> {
    return await ProductRepository.findByCategory(categoryId);
}

export async function getProductByFishermanDni(fishermanDni: string): Promise<Product[]> {
    return await ProductRepository.findByFishermanDni(fishermanDni);
}

export async function getProductByName(name: string): Promise<Product[]> {
    return await ProductRepository.findByName(name);
}

export async function getProductByPeriod(startDate: Date, endDate: Date): Promise<Product[]> {
    endDate.setTime(Date.now());
    startDate.setDate(startDate.getDate() - 7);
    return await ProductRepository.findByPeriod(startDate, endDate);
}

export async function updateProductStock(id: number, stock: number): Promise<Product | null> {
    return await ProductRepository.updateStock(id, stock);
}

export async function deleteProduct(id: number): Promise<Product> {
    return await ProductRepository.deleteById(id);
}

async function uploadProductImage(id: number, picture: Express.Multer.File) {
    const product = await ProductRepository.findById(id);

    if (product) {
        const imageUploaded = await imageService.uploadImage(picture, id.toString(),constants.productImageDirectory);
        if (imageUploaded.success) {
            product.image = imageUploaded.message;
            const newProduct = await ProductRepository.update(id, product);
            if(newProduct) {
                return {success: true, message: newProduct.image};
            } else {
                return {success: false, message: "Error updating user profile picture"};
            }
        } else {
            return {success: false, message: imageUploaded.message};
        }
    } else {
        return {success: false, message: "Product not found"};
    }
}

export default { createProduct, 
    updateProduct, 
    getProduct, 
    getProducts, 
    deleteProduct, 
    uploadProductImage, 
    getProductByCategory, 
    getProductByFishermanDni, 
    getProductByName, 
    getProductByPeriod, 
    updateProductStock
};