import LocationService from "../../application/services/LocationService";
import e, { Request, Response } from "express";
import { Location } from "../../domain/entities/Location";
import locationOptions from "../../infraestructure/location/locationOptions";
import { validationResult } from "express-validator";

async function createLocation(req: Request, res: Response): Promise<Response> {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const address = req.body.address + ', ' + req.body.neighborhood + ', ' + req.body.city + ', ' + req.body.country;
        const { latitude, longitude, success } = await locationOptions.getLatLong(address);
        if (!success) {
            return res.status(400).json({ error: 'Address not found' });
        }
        const locationRegister = {
            country: req.body.country,
            city: req.body.city,
            neighborhood: req.body.neighborhood,
            address: req.body.address,
            latitude: latitude,
            longitude: longitude,
        } as Location;


        const location = await LocationService.createLocation(locationRegister);
        if (location) {
            return res.status(201).json(location);
        } else {
            return res.status(409).json({ error: 'Location already exists' });
        }

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function updateLocation(req: Request, res: Response): Promise<Response> {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const address = req.body.address + ', ' + req.body.neighborhood + ', ' + req.body.city + ', ' + req.body.country;
        const { latitude, longitude, success } = await locationOptions.getLatLong(address);
        if (!success) {
            return res.status(400).json({ error: 'Address not found' });
        }

        const locationUpdate = {
            country: req.body.country,
            city: req.body.city,
            neighborhood: req.body.neighborhood,
            address: req.body.address,
            latitude: latitude,
            longitude: longitude,
        } as Location;

        const locationUpdated = await LocationService.updateLocation(req.body.id,locationUpdate);
        if (locationUpdated) {
            return res.status(200).json({ message: 'Location updated' });
        } else {
            return res.status(404).json({ error: 'Location not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function getLocation(req: Request, res: Response): Promise<Response> {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const location = await LocationService.getLocation(Number(id));
        if (location) {
            return res.status(200).json(location);
        } else {
            return res.status(404).json({ error: 'Location not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function deleteLocation(req: Request, res: Response): Promise<Response> {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { id } = req.params;
        const locationDeleted = await LocationService.deleteLocation(Number(id));
        if (locationDeleted) {
            return res.status(200).json({ message: 'Location deleted' });
        } else {
            return res.status(400).json({ error: 'Location could not be deleted' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

export default { createLocation, updateLocation, getLocation, deleteLocation };