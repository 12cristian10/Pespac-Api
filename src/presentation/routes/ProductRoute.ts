import { Request, Response } from "express";
import { Router } from "express";
import ProductController from "../controllers/ProductController";
import { authenticateJwt, authorizeRoles } from '../middlewares/auth';
import { serverConstants as constans } from "../../config/constans";
import { productRegister, productDelete, productGet, productGetByCategory, productGetByFisherman, productUpdate, getProductsByNames, updateStock, uploadImage } from "../../infraestructure/validators/ProductValidator";
const router = Router();

router.post(
    '/register',
    authenticateJwt,
    productRegister,
    authorizeRoles(constans.roles[0], constans.roles[1]),
    (req: Request, res: Response) => ProductController.createProduct(req, res)
);

router.put(
    '/update',
    authenticateJwt,
    productUpdate,
    authorizeRoles(constans.roles[0], constans.roles[1]),
    (req: Request, res: Response) => ProductController.updateProduct(req, res)
);

router.get(
    '/:id',
    authenticateJwt,
    productGet,
    (req: Request, res: Response) => ProductController.getProduct(req, res)
);

router.delete(
    '/:id',
    authenticateJwt,
    productDelete,
    authorizeRoles(constans.roles[0]),
    (req: Request, res: Response) => ProductController.deleteProduct(req, res)
);

router.get(
    '/',
    authenticateJwt,
    (req: Request, res: Response) => ProductController.getProducts(req, res)
);

router.get(
    '/category/:categoryId',
    authenticateJwt,
    productGetByCategory,
    (req: Request, res: Response) => ProductController.getProductsByCategory(req, res)
);

router.get(
    '/fisherman/:dni',
    authenticateJwt,
    productGetByFisherman,
    authorizeRoles(constans.roles[0], constans.roles[1]),
    (req: Request, res: Response) => ProductController.getProductsByFisherman(req, res)
);

router.get(
    '/name/:name',
    authenticateJwt,
    getProductsByNames,
    (req: Request, res: Response) => ProductController.getProductsByPeriod(req, res)
);

router.get(
    '/period',
    authenticateJwt,
    (req: Request, res: Response) => ProductController.getProductsByPeriod(req, res)
);

router.put(
    '/stock',
    authenticateJwt,
    updateStock,
    (req: Request, res: Response) => ProductController.updateProductStock(req, res)
);

router.post(
    '/upload',
    authenticateJwt,
    uploadImage,
    authorizeRoles(constans.roles[0], constans.roles[1]),
    (req: Request, res: Response) => ProductController.uploadProductImage(req, res)
);

export default router;