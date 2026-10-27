const fetch = require('node-fetch');

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { orderId, amount, customer, items } = JSON.parse(event.body);
    const MERCADOPAGO_ACCESS_TOKEN = process.env.VITE_MERCADOPAGO_ACCESS_TOKEN || 'APP_USR-1812187507012211-102712-308c387108d8d06e1d2de659247d0294-2461933848';

    const itemNames = items.map((i) => `${i.quantity}x ${i.product.name}`).join(', ');

    const payload = {
      transaction_amount: parseFloat(amount.toFixed(2)),
      description: `Street Store #${orderId} - ${itemNames.substring(0, 50)}`,
      payment_method_id: 'pix',
      payer: {
        email: customer.email || 'cliente@streetstore.com.br',
        first_name: customer.name.split(' ')[0] || 'Cliente',
        last_name: customer.name.split(' ').slice(1).join(' ') || 'Street',
        identification: {
          type: customer.cpf.replace(/\D/g, '').length > 11 ? 'CNPJ' : 'CPF',
          number: customer.cpf.replace(/\D/g, ''),
        },
      },
    };

    const response = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Idempotency-Key': orderId,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: data.id,
        status: data.status,
        qrCode: data.point_of_interaction?.transaction_data?.qr_code,
        qrCodeBase64: data.point_of_interaction?.transaction_data?.qr_code_base64,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}