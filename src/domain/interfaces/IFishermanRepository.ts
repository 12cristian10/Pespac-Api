import { Fisherman } from '../entities/Fisherman';

export interface IFishermanRepository {
  
  findByDni(dni: string): Promise<Fisherman | null>;
  create(fisherman: Fisherman): Promise<Fisherman>;
  update(dni: string, score: number ): Promise<boolean>;
}
