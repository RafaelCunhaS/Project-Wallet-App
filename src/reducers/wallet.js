import { ADD_CURRENCIES, ADD_EXPENSE, EDIT_LINE, REMOVE_LINE } from '../actions';

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
      }],
    };
  case ADD_CURRENCIES:
    return { ...state,
      currencies: [...Object.keys(action.payload)] };
  case REMOVE_LINE:
    return { ...state,
      expenses: [...state.expenses.filter((obj) => obj.id !== action.payload)],
    };
  case EDIT_LINE:
    return { ...state,
      expenses: [...state.expenses.map((obj) => (obj.id
        === action.id ? { ...action.payload, exchangeRates: obj.exchangeRates }
        : obj))] };
  default:
    return state;
  }
};

export default walletReducer;
