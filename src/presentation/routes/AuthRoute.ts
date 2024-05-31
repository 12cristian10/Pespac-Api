import { Router } from 'express';
import { Request, Response } from 'express';
import  authController  from '../controllers/AuthController';
import { registerValidator, loginValidator } from '../../infraestructure/validators/AuthValidator';

const router = Router();

router.post(
  '/register',
  registerValidator,
  (req: Request, res: Response) => authController.register(req, res)
);

router.post(
  '/login',
  loginValidator,
  (req: Request, res: Response) => authController.login(req, res)
);

router.get("/login", async (req: Request, res: Response) => {
    res.json({ success: false, message: "User not logged in" });
  });

router.get("/logout", async (req: Request, res: Response) => {
    res.json({ success: false, message: "User not logged in" });
  });


export default router;
