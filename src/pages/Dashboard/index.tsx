import React, { useState, useEffect } from 'react';

import { FiTrash } from 'react-icons/fi';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: string;
  createdAt: string;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  async function loadTransactions(): Promise<void> {
    const response = await api.get('/transactions');

    const formatedTransactions = response.data.transactions.map(
      (transaction: Transaction) => ({
        ...transaction,
        formattedValue: formatValue(transaction.value),
        formattedDate: new Date(transaction.createdAt).toLocaleDateString(
          'pt-br',
        ),
      }),
    );
    const { income, outcome, total } = response.data.balance;

    setTransactions(formatedTransactions);
    setBalance({ total, outcome, income });
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  async function handleDeleteTransaction(id: string): Promise<void> {
    const transactionToDelete = transactions.find(
      transaction => transaction.id === id,
    );
    if (!transactionToDelete) return;

    if (transactionToDelete.type === 'outcome') {
      const newOutcomeValue = balance.outcome - transactionToDelete.value;
      setBalance({
        ...balance,
        outcome: newOutcomeValue,
        total: balance.income - newOutcomeValue,
      });
    } else {
      const newIncomeValue = balance.income - transactionToDelete.value;
      setBalance({
        ...balance,
        income: balance.income - transactionToDelete.value,
        total: newIncomeValue - balance.outcome,
      });
    }

    const newTransactions = transactions.filter(
      transaction => transaction.id !== id,
    );

    setTransactions(newTransactions);
  }

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{formatValue(balance.income)}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              {formatValue(balance.outcome)}
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{formatValue(balance.total)}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction => {
                console.log({ transaction });
                return (
                  <tr key={transaction.id}>
                    <td className="title">{transaction.title}</td>
                    <td className={transaction.type}>
                      {transaction.type === 'outcome' && ' - '}
                      {transaction.formattedValue}
                    </td>
                    <td>{transaction.category}</td>
                    <td>{transaction.formattedDate}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleDeleteTransaction(transaction.id)}
                      >
                        <FiTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
