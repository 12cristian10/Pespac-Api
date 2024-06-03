import LocationRepository from "../../infraestructure/repository/LocationRepository";
import { Location } from "../../domain/entities/Location";

export async function createLocation(location: Location): Promise<Location | null> {
    return await LocationRepository.create(location);
}

export async function updateLocation(id: number, location: Location): Promise<Location | null> {
    return await LocationRepository.update(id, location);
}

export async function getLocation(id: number): Promise<Location | null> {
    return await LocationRepository.findById(id);
}

export async function getLocations(): Promise<Location[]> {
    return await LocationRepository.findAll();
}

export async function deleteLocation(id: number): Promise<boolean> {
    const locationExist = await LocationRepository.findById(id);
    if (!locationExist) {
        return false;
    }else{
        const locationDeleted = await LocationRepository.deleteById(id);
        return locationDeleted ? true : false;
    }
}

export default { createLocation, updateLocation, getLocation, getLocations, deleteLocation};