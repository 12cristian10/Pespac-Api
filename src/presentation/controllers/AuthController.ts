import { Request, Response } from 'express';
import authService from '../../application/services/AuthService';
import authOptions from '../../infraestructure/authentication/AuthOptions';
import { User } from '../../domain/entities/User';
import { Fisherman } from '../../domain/entities/Fisherman';
import { serviceConstants, serverConstants } from '../../config/constans';
import { validationResult } from 'express-validator';

    async function register(req: Request, res: Response): Promise<Response> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            console.log(req.body);
            const userRegister = {
                dni: req.body.dni,
                dniType: req.body.dniType,
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                lastName: req.body.lastName,
                role: req.body.role,
                phone: req.body.phone,
                ProfilePicture: serviceConstants.defaultProfilePicture,
            }as User;
            console.log(userRegister);
            const user = await authService.register(userRegister);
            console.log(user);
            
            if (user) {
                const tokenSesion = await authOptions.generateToken({ email: user.email, password: user.password, role: user.role});
                return res.status(201).json({user,tokenSesion});
            } else {
                return res.status(409).json({ error: 'User already exists' });
            }
            
        } catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({ error: error.message });
                } else {
                    return res.status(400).json({ error: 'An unknown error occurred' });
                }
        }
    }

    async function login(req: Request, res: Response): Promise<Response> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const user = await authService.IsValidUser(req.body.email, req.body.password);
            if (user) {
                const tokenSesion = await authOptions.generateToken({ email: user.email, password: user.password, role: user.role});
                return res.status(200).json({ tokenSesion });
            } else {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            } else {
                return res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }

export default { register, login };