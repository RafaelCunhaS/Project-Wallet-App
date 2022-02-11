import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends React.Component {
  getTotal = () => {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach((item) => {
      const exchange = item.exchangeRates[item.currency].ask;
      total += item.value * exchange;
    });
    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <span data-testid="email-field">{`Email: ${email}`}</span>
        <span data-testid="total-field">
          Despesa Total:
          { `R$ ${this.getTotal()}` }
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: propTypes.string.isRequired,
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
};
