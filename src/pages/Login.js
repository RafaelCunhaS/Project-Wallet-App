import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getEmail } from '../actions';
import logo from '../wallet.png';
import './Login.css';

const MIN_LENGTH = 6;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      btnDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateButton());
  }

  validateButton = () => {
    const { email, password } = this.state;
    const validEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]+)[^0-9]$/i);
    const validPassword = password.length >= MIN_LENGTH;
    if (validEmail && validPassword) {
      this.setState({ btnDisabled: false });
    } else this.setState({ btnDisabled: true });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { history, getUserEmail } = this.props;
    getUserEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, btnDisabled } = this.state;
    return (
      <div className="container">
        <form onSubmit={ this.handleSubmit } className="login-container">
          <img
            src={ logo }
            alt="Wallet"
            style={ { width: '8rem', alignSelf: 'center', marginBottom: '1.4rem' } }
          />
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            name="email"
            className="login-input"
            value={ email }
            onChange={ this.handleChange }
          />
          <legend style={ { fontSize: '0.8rem', color: 'rgba(0, 0, 0, 0.5)' } }>
            Insira um email válido
          </legend>
          <input
            type="password"
            id="password"
            placeholder="Password "
            name="password"
            className="login-input"
            value={ password }
            onChange={ this.handleChange }
            maxLength={ 12 }
          />
          <legend style={ { fontSize: '0.8rem', color: 'rgba(0, 0, 0, 0.5)' } }>
            A senha precisa ter entre 6-12 caracteres
          </legend>
          <button
            type="submit"
            disabled={ btnDisabled }
            className="login-btn"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUserEmail: (payload) => dispatch(getEmail(payload)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  getUserEmail: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
