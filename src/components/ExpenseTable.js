import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { removeLine } from '../actions';

class ExpenseTable extends React.Component {
  render() {
    const { expenses, removeItem, handleEdit } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(({ id, description, tag, method,
            value, currency, exchangeRates }) => (
            (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name.split('/')[0]}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>{(exchangeRates[currency].ask * value).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => handleEdit({ id,
                      description,
                      tag,
                      method,
                      value,
                      currency }) }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => removeItem(id) }
                  >
                    X
                  </button>
                </td>
              </tr>
            )))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeItem: (payload) => dispatch(removeLine(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);

ExpenseTable.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
  removeItem: propTypes.func.isRequired,
  handleEdit: propTypes.func.isRequired,
};
