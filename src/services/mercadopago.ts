import { CartItem } from '../types';

export async function createPixPayment(
  orderId: string,
  amount: number,
  customer: { name: string; email: string; cpf: string },
  items: CartItem[]
) {
  try {
    const response = await fetch('/.netlify/functions/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId, amount, customer, items }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro na Serverless Function:', errorData);
      throw new Error('Falha ao gerar pagamento');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Falha ao processar pagamento:', error);
    throw error;
  }
}