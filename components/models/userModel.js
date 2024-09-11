export const initialState = {
  firsName: '', 
  lastName: '', 
  email: '',
  password: '',
  accessToken: null,
  refreshToken: null,  
};

export function userReducer(state, action) {
  switch (action.type) {
    case 'SET_FIRST_NAME':  
      return { ...state, firsName: action.payload };  
    case 'SET_LAST_NAME':    
      return { ...state, lastName: action.payload };  
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_TOKENS':
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}
