export interface Order {
    id: string;
    userDni: string;
    total: number;
    status: string;
    DeliveryDate: Date;
    locationId: number;
}