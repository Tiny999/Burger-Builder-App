import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 200,
  error: false
};


const INGREDIENT_PRICES = {
  salad: 250.00,
  bacon: 150.00,
  cheese: 150.00,
  meat: 350.00
}

const reducer = (state = initialState, action) => {
  switch( action.type ){
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      }
    case actionTypes.SET_INGREDIENT:
      return {
        ...state, 
        ingredients: action.ingredients,
        error: false
      }
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return{
        ...state,
        error: true
      }
    default: 
      return state;
  }
}

export default reducer;