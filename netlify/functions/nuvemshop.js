const fetch = require('node-fetch');

export async function handler(event) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const STORE_ID = '6486155';
    const ACCESS_TOKEN = process.env.NUVEMSHOP_ACCESS_TOKEN || '9986a45d4f290dc55545b7194ea814ddac148e95';

    const response = await fetch(`https://api.nuvemshop.com.br/v1/${STORE_ID}/products?per_page=200`, {
      method: 'GET',
      headers: {
        'Authentication': `bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'StreetStore (contato@streetstore.com.br)',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { statusCode: response.status, body: JSON.stringify(data) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}