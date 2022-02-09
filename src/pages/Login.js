import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getEmail } from '../actions';

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
    console.log(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, btnDisabled } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          data-testid="email-input"
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          name="password"
          value={ password }
          onChange={ this.handleChange }
          data-testid="password-input"
        />
        <button type="submit" disabled={ btnDisabled }>Entrar</button>
      </form>
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
