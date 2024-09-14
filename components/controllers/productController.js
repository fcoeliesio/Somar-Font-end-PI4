import { api, setAuthHeader } from '../config/api';

export const createProduct = async (product, batch) => {
  try {
    const token = 'userAccessToken'; // Substitua pelo token do usuário autenticado
    setAuthHeader(token);

    const response = await api.post('products', {
      batch: {
        uuid: batch.uuid || '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        barcode: batch.barcode,
        amount: batch.amount,
        damaged: batch.damaged,
      },
      product: {
        uuid: product.uuid || '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: product.name,
        image: product.image,
        sellingPrice: parseFloat(product.sellingPrice),
        buyingPrice: parseFloat(product.buyingPrice),
        damaged: product.damaged,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Erro ao cadastrar produto');
  }
};
