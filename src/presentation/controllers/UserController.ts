import { Request, Response } from 'express';
import { User } from '../../domain/entities/User';
import userService from '../../application/services/UserService';
import { serviceConstants } from '../../config/constans';
import { validationResult } from 'express-validator';

async function updateUser(req: Request, res: Response): Promise<Response> {
    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userOld = {
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

        const emailRegister = await userService.userEmailExist(userOld.email);

        if(emailRegister){
            return res.status(400).json({ error: 'Email already exists' });
        }else{
            const userUpdated = await userService.updateUser(userOld);
            if (userUpdated) {
                return res.status(200).json(userUpdated);
            } else {
                return res.status(400).json({ error: 'User could not be updated' });
            }
        }

    }catch(error){
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function getUser(req: Request, res: Response): Promise<Response> {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { dni } = req.params;
        const user = await userService.getUser(dni);
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function deleteUser(req: Request, res: Response): Promise<Response> {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { dni } = req.params;
        const userDeleted = await userService.deleteUser(dni);
        if (userDeleted) {
            return res.status(200).json({ message: 'User deleted' });
        } else {
            return res.status(400).json({ error: 'User could not be updated' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function uploadProfilePicture(req: Request, res: Response): Promise<Response> {
    try {
        const dni = req.body.dni;
        const picture = req.file as any;

        const imageUploaded = await userService.uploadProfilePicture(dni, picture);
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

export default { updateUser, getUser, deleteUser, uploadProfilePicture };