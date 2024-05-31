import fishermanRepository from "../../infraestructure/repository/FishermanRepository";
import { Fisherman } from "../../domain/entities/Fisherman";


export async function createFisherman(fisherman: Fisherman): Promise<Fisherman> {
    return await fishermanRepository.create(fisherman);
}
export async function updateFisherman(dni: string, score: number): Promise<boolean> {
    return await fishermanRepository.update(dni, score);
}
    
export async function getFisherman(dni: string): Promise<Fisherman | null> {
    return await fishermanRepository.findByDni(dni);
}

export default { createFisherman, updateFisherman, getFisherman};
