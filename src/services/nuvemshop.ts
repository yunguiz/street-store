import { Product } from '../types';

export async function fetchNuvemshopProducts(): Promise<Product[]> {
  try {
    // Chamada segura para a Serverless Function da Netlify (sem expor o token no browser)
    const response = await fetch('/.netlify/functions/nuvemshop', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn('Erro na resposta da Netlify Function da Nuvemshop:', response.status);
      return [];
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((item: any) => {
      const primaryVariant = item.variants && item.variants[0];
      const mainImage = item.images && item.images[0] ? item.images[0].src : '';

      const rawCategoryStr = item.categories && item.categories.length > 0
        ? item.categories.map((c: any) => c.name?.pt || c.name || '').join(', ')
        : '';

      const productName = item.name?.pt || item.name?.es || item.name?.en || 'Produto Street Store';

      const availableSizes = item.variants
        ? item.variants.map((v: any) => v.values && v.values[0] && v.values[0].pt).filter(Boolean)
        : ['P', 'M', 'G', 'GG'];

      return {
        id: String(item.id),
        name: productName,
        subtitle: rawCategoryStr || 'Coleção Oficial Streetwear',
        price: parseFloat(primaryVariant?.price || '0.00'),
        originalPrice: primaryVariant?.promotional_price ? parseFloat(primaryVariant.price) : undefined,
        image: mainImage,
        images: item.images ? item.images.map((img: any) => img.src) : [mainImage],
        description: item.description?.pt || '',
        details: ['Modelagem Exclusiva Streetwear', 'Acabamento de Alta Qualidade', 'Pronta Entrega'],
        category: mapCategoryName(rawCategoryStr, productName),
        gender: mapGender(rawCategoryStr),
        sizes: availableSizes.length > 0 ? Array.from(new Set(availableSizes)) : ['Único'],
        inStock: item.published && (primaryVariant?.stock === null || primaryVariant?.stock > 0),
      } as unknown as Product;
    });
  } catch (error) {
    console.error('Erro de conexão com a API da Nuvemshop:', error);
    return [];
  }
}

function mapCategoryName(rawCategory: string, name: string): any {
  const catLower = (rawCategory || '').toLowerCase();
  const nameLower = (name || '').toLowerCase();

  if (
    catLower.includes('tênis') || catLower.includes('tenis') || 
    catLower.includes('calçados') || catLower.includes('chinelo') || 
    catLower.includes('meias') || nameLower.includes('tenis') ||
    nameLower.includes('tênis') || nameLower.includes('chinelo') ||
    nameLower.includes('meia') || nameLower.includes('havaianas') ||
    nameLower.includes('cadarço')
  ) {
    return 'CALÇADOS';
  }

  if (
    catLower.includes('acessórios') || catLower.includes('bonés') || 
    catLower.includes('óculos') || catLower.includes('bags') ||
    nameLower.includes('boné') || nameLower.includes('oakley') ||
    nameLower.includes('radar ev') || nameLower.includes('bag')
  ) {
    return 'ACESSÓRIOS';
  }

  return 'ROUPAS';
}

function mapGender(rawCategory: string): 'MASCULINO' | 'FEMININO' | 'UNISSEX' {
  const catLower = (rawCategory || '').toLowerCase();
  if (catLower.includes('feminino') && catLower.includes('masculino')) return 'UNISSEX';
  if (catLower.includes('feminino')) return 'FEMININO';
  if (catLower.includes('masculino')) return 'MASCULINO';
  return 'UNISSEX';
}