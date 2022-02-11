// Coloque aqui suas actions

export const USER_EMAIL = 'USER_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_LINE = 'REMOVE_LINE';
export const EDIT_LINE = 'EDIT_LINE';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';

export const getEmail = (payload) => ({ type: USER_EMAIL, payload });

export const getCurrencies = (payload) => ({ type: ADD_CURRENCIES, payload });

export const getExpense = (payload, exchangeRates) => ({ type: ADD_EXPENSE,
  payload,
  exchangeRates,
});

export const removeLine = (payload) => ({ type: REMOVE_LINE, payload });

export const editLine = (id, payload) => ({ type: EDIT_LINE, id, payload });

export const fetchData = () => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((data) => {
    dispatch(getCurrencies(data));
    return data;
  })
  .catch((error) => error);
