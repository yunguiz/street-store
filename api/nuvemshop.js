export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const STORE_ID = process.env.VITE_NUVEMSHOP_STORE_ID || '6486155';
    const ACCESS_TOKEN = process.env.NUVEMSHOP_ACCESS_TOKEN;

    if (!ACCESS_TOKEN) {
      return res.status(500).json({ error: 'NUVEMSHOP_ACCESS_TOKEN não configurado no ambiente da Vercel.' });
    }

    // Faz o pedido diretamente à API oficial da Nuvemshop
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
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}