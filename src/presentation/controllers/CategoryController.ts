import { Request, Response } from "express";
import CategoryService from "../../application/services/CategoryService";
import { Category } from "../../domain/entities/Category";

async function createCategory(req: Request, res: Response): Promise<Response> {
    try {
        const category = {
            name: req.body.name,
            description: req.body.description,
        } as Category;

        const categoryCreated = await CategoryService.createCategory(category);
        if (categoryCreated) {
            return res.status(201).json(categoryCreated);
        } else {
            return res.status(409).json({ error: 'Category already exists' });
        }

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function updateCategory(req: Request, res: Response): Promise<Response> {
    try {
        const categoryOld = { 
            name: req.body.name, 
            description: req.body.description
        } as Category;
        
        const categoryUpdated = await CategoryService.updateCategory(req.body.id,categoryOld);
        if (categoryUpdated) {
            return res.status(200).json({ message: 'Category updated' });
        } else {
            return res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function getCategory(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;

        const category = await CategoryService.getCategory(Number(id));
        if (category) {
            return res.status(200).json(category);
        } else {
            return res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function deleteCategory(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const categoryDeleted = await CategoryService.deleteCategory(Number(id));
        if (categoryDeleted) {
            return res.status(200).json({ message: 'Category deleted' });
        } else {
            return res.status(400).json({ error: 'Category could not be deleted' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

export default { createCategory, updateCategory, getCategory, deleteCategory };