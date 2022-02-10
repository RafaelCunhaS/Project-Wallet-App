// Coloque aqui suas actions

export const USER_EMAIL = 'USER_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const getEmail = (payload) => ({ type: USER_EMAIL, payload });

export const getExpense = (payload, exchangeRates) => ({ type: ADD_EXPENSE,
  payload,
  exchangeRates });

export const getCurrency = (payload) => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((data) => { dispatch(getExpense(payload, data)); })
  .catch((error) => error);
