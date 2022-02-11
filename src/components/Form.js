import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { editLine, fetchData, getExpense } from '../actions';
import ExpenseTable from './ExpenseTable';

// const INITIAL_STATE = {
//   value: '',
//   description: '',
//   currency: 'USD',
//   method: 'Dinheiro',
//   tag: 'Alimentação',
//   currencyArray: [],
//   isEditing: false,
//   id: '0',
// };

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      isEditing: false,
      id: 0,
    };
  }

  async componentDidMount() {
    const { getData } = this.props;
    await getData();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = async () => {
    const { addExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => addExpense({ value, description, currency, method, tag }, data))
      .catch((error) => error);
    this.setState({ value: '' });
  }

  handleEdit = (values) => {
    this.setState({ ...values, isEditing: true });
  }

  submitEdit = () => {
    const { id, value, description, currency, method, tag } = this.state;
    const { editItem } = this.props;
    editItem(id, { id, value, description, currency, method, tag });
    this.setState({ value: '', isEditing: false });
  }

  render() {
    const {
      value,
      description, currency, method, tag, isEditing } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              id="value"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
              data-testid="currency-input"
            >
              { currencies.filter((coin) => coin !== 'USDT')
                .map((curr) => <option key={ curr }>{curr}</option>) }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              id="method"
              name="method"
              value={ method }
              onChange={ this.handleChange }
              data-testid="method-input"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              id="tag"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
              data-testid="tag-input"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              id="description"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>
          {isEditing ? (
            <button
              type="button"
              onClick={ this.submitEdit }
            >
              Editar despesa
            </button>)
            : (
              <button
                type="button"
                onClick={ this.handleSubmit }
              >
                Adicionar despesa
              </button>)}
        </form>
        <ExpenseTable handleEdit={ this.handleEdit } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(fetchData()),
  editItem: (id, payload) => dispatch(editLine(id, payload)),
  addExpense: (payload, exchangeRates) => dispatch(getExpense(payload, exchangeRates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  getData: propTypes.func.isRequired,
  editItem: propTypes.func.isRequired,
  addExpense: propTypes.func.isRequired,
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
};
