import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getCurrency } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      currencyArray: [],
      totalExpense: 0,
    };
  }

  componentDidMount() {
    this.getCurrencys();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { getData } = this.props;
    const { value, description, currency, method, tag } = this.state;
    await getData({ value, description, currency, method, tag });
    const { expenses } = this.props;
    const data = expenses[expenses.length - 1].exchangeRates[currency].ask;
    this.setState((prevState) => ({
      totalExpense: prevState.totalExpense + value * data }), () => {
      this.setState({ value: '' });
    });
  }

  getCurrencys = () => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => this.setState({
        currencyArray: Object.keys(data).filter((USDT) => USDT !== 'USDT') }))
      .catch((e) => console.error(e));
  }

  render() {
    const {
      value,
      description, currency, method, tag, currencyArray, totalExpense } = this.state;
    const { email } = this.props;
    return (
      <div>
        <header>
          <span data-testid="email-field">{`Email: ${email}`}</span>
          <span data-testid="total-field">
            Despesa Total:
            { `R$ ${totalExpense}` }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <form onSubmit={ this.handleSubmit }>
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
              { currencyArray.map((curr) => <option key={ curr }>{curr}</option>) }
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
          <button type="submit">Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getData: (payload) => dispatch(getCurrency(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: propTypes.string.isRequired,
  getData: propTypes.func.isRequired,
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
};
