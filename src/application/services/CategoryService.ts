import CategoryRepository from "../../infraestructure/repository/CategoryRepository";
import { Category } from "../../domain/entities/Category";

export async function createCategory(category: Category): Promise<Category | null> {
    return await CategoryRepository.create(category);
}

export async function updateCategory(id: number, category: Category): Promise<Category | null> {
    const categoryExist = await CategoryRepository.findById(id);
    if (!categoryExist) {
        return null;
    }
    return await CategoryRepository.update(id, category);
}

export async function getCategory(id: number): Promise<Category | null> {
    return await CategoryRepository.findById(id);
}

export async function getCategories(): Promise<Category[]> {
    return await CategoryRepository.findAll();
}

export async function deleteCategory(id: number): Promise<boolean> {
    const categoryExist = await CategoryRepository.findById(id);
    if (!categoryExist) {
        return false;
    }else{
        const categoryDeleted = await CategoryRepository.deleteById(id);
        return categoryDeleted ? true : false; 
    }
}

export default { createCategory, updateCategory, getCategory, getCategories, deleteCategory};