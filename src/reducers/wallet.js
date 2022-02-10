import { ADD_EXPENSE } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, {
        id: state.expenses.length === 0 ? 0
          : state.expenses[state.expenses.length - 1].id + 1,
        ...action.payload,
        exchangeRates: { ...action.exchangeRates },
      }] };
  default:
    return state;
  }
};

export default walletReducer;
