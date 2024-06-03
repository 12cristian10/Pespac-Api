import { v4 as uuidv4 } from 'uuid';

let orderCounter = 0;

export const generateOrderId = (): string => {
  // Incrementar el contador de pedidos
  orderCounter++;

  // Obtener la fecha actual en formato YYYYMMDD
  const date = new Date();
  const dateString = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;

  // Generar un UUID y tomar los primeros 8 caracteres
  const uniqueId = uuidv4().slice(0, 8);

  // Combinar la fecha, el contador y el identificador único para crear el ID de pedido
  const orderId = `${dateString}-${orderCounter.toString().padStart(4, '0')}-${uniqueId}`;

  return orderId;
};
