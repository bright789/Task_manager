const initialState = {
  token: null,
  isAdmin: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'SET_ADMIN':
      return { ...state, isAdmin: action.payload };
    default:
      return state;
  }
};

export default authReducer;
