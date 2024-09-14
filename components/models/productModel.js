export const initialProductState = {
    product: {
      uuid: '',
      name: '',
      image: '',
      sellingPrice: '',
      buyingPrice: '',
      damaged: false,
    },
    batch: {
      uuid: '',
      barcode: '',
      amount: '',
      damaged: false,
    },
  };
  
  // Reducer para manipular o estado do produto e do lote
  export const productReducer = (state, action) => {
    switch (action.type) {
      case 'SET_PRODUCT':
        return { 
          ...state, 
          product: { 
            ...state.product, 
            ...action.payload // Atualiza apenas as propriedades passadas na ação
          } 
        };
        
      case 'SET_BATCH':
        return { 
          ...state, 
          batch: { 
            ...state.batch, 
            ...action.payload // Atualiza apenas as propriedades passadas na ação
          } 
        };
      
      case 'RESET_PRODUCT':
        return initialProductState; // Reseta o estado para o inicial
        
      default:
        return state;
    }
  };
  