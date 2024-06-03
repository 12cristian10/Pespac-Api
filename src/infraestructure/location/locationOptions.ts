import axios from 'axios';
import { serviceConstants as constants } from '../../config/constans';
import { locationDto } from '../../domain/dtos/locationDto';

async function getLatLong(address: string): Promise<locationDto> {

    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address,
            key: constants.googleMapsApiKey,
        }
    });

    const data = response.data;

    if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return { latitude: location.lat, longitude: location.lng, success: false } as locationDto;
    } else {
        return { latitude: 0, longitude: 0, success: false } as locationDto;
    }
}

export default { getLatLong };