import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { removeLine } from '../actions';

class ExpenseTable extends React.Component {
  render() {
    const { expenses, removeItem } = this.props;
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
          {expenses.map((data) => (
            <tr key={ data.id }>
              <td>{data.description}</td>
              <td>{data.tag}</td>
              <td>{data.method}</td>
              <td>{Number(data.value).toFixed(2)}</td>
              <td>{data.exchangeRates[data.currency].name.split('/')[0]}</td>
              <td>{Number(data.exchangeRates[data.currency].ask).toFixed(2)}</td>
              <td>{(data.exchangeRates[data.currency].ask * data.value).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button type="button" data-testid="edit-btn">Editar despesa</button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => removeItem(data.id) }
                >
                  X
                </button>
              </td>
            </tr>
          ))}
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
};
