import { CartItem } from '../types';

export interface BlingCustomer {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  address?: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface BlingOrderPayload {
  orderId: string;
  customer: BlingCustomer;
  items: CartItem[];
  shippingCost?: number;
}

export function buildBlingOrderPayload(
  orderId: string,
  customer: BlingCustomer,
  items: CartItem[],
  shippingCost: number = 0
) {
  return {
    numero: orderId,
    data: new Date().toISOString().split('T')[0],
    contato: {
      id: 0,
      nome: customer.name,
      tipoPessoa: customer.cpf.replace(/\D/g, '').length > 11 ? 'J' : 'F',
      cpfCnpj: customer.cpf.replace(/\D/g, ''),
      email: customer.email,
      telefone: customer.phone.replace(/\D/g, ''),
    },
    itens: items.map((item) => ({
      codigo: item.product.id,
      descricao: `${item.product.name} - TAM ${item.selectedSize}`,
      quantidade: item.quantity,
      valor: item.product.price,
    })),
    transporte: {
      frete: shippingCost,
      etiqueta: customer.address
        ? {
            nome: customer.name,
            endereco: customer.address.street,
            numero: customer.address.number,
            bairro: customer.address.neighborhood,
            municipio: customer.address.city,
            uf: customer.address.state,
            cep: customer.address.zipCode.replace(/\D/g, ''),
          }
        : undefined,
    },
  };
}

export async function sendOrderToBling(orderData: BlingOrderPayload, accessToken: string) {
  const payload = buildBlingOrderPayload(
    orderData.orderId,
    orderData.customer,
    orderData.items,
    orderData.shippingCost || 0
  );

  try {
    const response = await fetch('https://www.bling.com.br/Api/v3/pedidos/vendas', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro ao enviar pedido para o Bling:', errorData);
      throw new Error(`Falha no Bling: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro de conexão com o Bling:', error);
    throw error;
  }
}