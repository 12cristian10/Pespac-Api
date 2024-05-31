export interface RegisterClientDTO {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    dni: string;
    birthDate: string;
}

export interface RegisterWorkerDTO extends RegisterClientDTO {
    serviceType: string;
    description: string;
    pricePerHour: number;
  }