import { api, setAuthHeader } from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createProduct = async (product, batch, token) => {
  try {
    setAuthHeader(token); // Define o cabeçalho de autenticação com o token

    const response = await api.post('products', {
      batch: {
        uuid: batch.uuid,
        barcode: batch.barcode,
        amount: batch.amount,
        damaged: batch.damaged,
      },
      product: {
        uuid: product.uuid,
        name: product.name,
        image: product.image,
        sellingPrice: product.sellingPrice,
        buyingPrice: product.buyingPrice,
        damaged: product.damaged,
      },
    });

    if (response.data.batch && response.data.product) {
      return { success: true, message: 'Produto cadastrado com sucesso!' };
    } else {
      throw new Error('Dados de resposta inesperados');
    }
  } catch (error) {
    throw new Error(error.message || 'Erro ao cadastrar produto');
  }
};
