import { CartItem } from '../types';

export async function sendOrderToBling(orderData: any, accessToken: string) {
  try {
    const response = await fetch('/.netlify/functions/create-bling-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderData, accessToken }),
    });

    if (!response.ok) {
      throw new Error('Falha ao sincronizar pedido com o Bling');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na integração com o Bling:', error);
    throw error;
  }
}