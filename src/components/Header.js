import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import './Header.css';
import logo from '../wallet.png';

class Header extends React.Component {
  getTotal = () => {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach((item) => {
      const exchange = item.exchangeRates[item.currency].ask;
      total += item.value * exchange;
    });
    return total.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  render() {
    const { email } = this.props;
    return (
      <header className="header-container">
        <img src={ logo } alt="wallet" />
        <div className="header-info">
          <p data-testid="email-field">{`Email: ${email}`}</p>
          <p data-testid="total-field">
            { `Despesa Total: R$ ${this.getTotal()}` }
          </p>
        </div>
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
  expenses: propTypes.arrayOf(propTypes.shape({ obj: propTypes.string })).isRequired,
};
