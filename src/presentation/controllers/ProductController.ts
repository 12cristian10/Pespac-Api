import ProductService from "../../application/services/ProductService";
import { Product } from "../../domain/entities/Product";
import { Request, Response } from "express";
import { serviceConstants as constants } from "../../config/constans";

async function createProduct(req: Request, res: Response): Promise<Response> {
    try {
        const productRegister = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            image: req.body.image || constants.defaultProductImage,
            categoryId: req.body.categoryId,
        } as Product;

        const product = await ProductService.createProduct(productRegister);
        if (product) {
            return res.status(201).json(product);
        } else {
            return res.status(409).json({ error: 'Product already exists' });
        }

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function updateProduct(req: Request, res: Response): Promise<Response> {
    try {
        const product = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            image: req.body.image || constants.defaultProductImage,
            categoryId: req.body.categoryId,
        } as Product;
        const productUpdated = await ProductService.updateProduct(req.body.id,product);
        if (productUpdated) {
            return res.status(200).json({ message: 'Product updated' });
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function getProduct(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const product = await ProductService.getProduct(Number(id));
        if (product) {
            return res.status(200).json(product);
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function getProducts(req: Request, res: Response): Promise<Response> {
    try {
        const products = await ProductService.getProducts();
        return res.status(200).json(products);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const productDeleted = await ProductService.deleteProduct(Number(id));
        if (productDeleted) {
            return res.status(200).json({ message: 'Product deleted' });
        } else {
            return res.status(400).json({ error: 'Product could not be deleted' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function uploadProductImage(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.body.id;
        const picture = req.file as any;

        const imageUploaded = await ProductService.uploadProductImage(Number(id), picture);
        if (imageUploaded.success) {
            return res.status(200).json({ message: imageUploaded.message });
        } else {
            return res.status(400).json({ error: imageUploaded.message });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function getProductsByCategory(req: Request, res: Response): Promise<Response> {
    try {
        const { categoryId } = req.params;
        const products = await ProductService.getProductByCategory(Number(categoryId));
        return res.status(200).json(products);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function getProductsByNames(req: Request, res: Response): Promise<Response> {
    try {
        const { name } = req.params;
        const products = await ProductService.getProductByName(name);
        return res.status(200).json(products);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function getProductsByFisherman(req: Request, res: Response): Promise<Response> {
    try {
        const { fishermanDni } = req.params;
        const products = await ProductService.getProductByFishermanDni(fishermanDni);
        return res.status(200).json(products);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function getProductsByPeriod(req: Request, res: Response): Promise<Response> {
    try {
        const { start, end } = req.params;
        const startDate = new Date(start);
        const endDate = new Date(end);
        const products = await ProductService.getProductByPeriod(startDate, endDate);
        return res.status(200).json(products);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function updateProductStock(req: Request, res: Response): Promise<Response> {
    try {
        const { id, stock } = req.body;
        const productUpdated = await ProductService.updateProductStock(id, stock);
        if (productUpdated) {
            return res.status(200).json({ message: 'Product updated' });
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

export default { createProduct, 
    updateProduct, 
    getProduct, 
    getProducts, 
    deleteProduct, 
    uploadProductImage , 
    getProductsByCategory, 
    getProductsByNames, 
    getProductsByFisherman, 
    getProductsByPeriod, 
    updateProductStock};

