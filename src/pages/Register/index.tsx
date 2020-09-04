import React, { useState, FormEvent } from 'react';
import { FiArrowDownCircle, FiArrowUpCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Container, Title, FormContainer, ButtonsContainer } from './styles';
import Header from '../../components/Header';
import api from '../../services/api';

const Register: React.FC = () => {
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    await api.post('/transactions', {
      title,
      type,
      value,
      category,
    });

    history.push('/');
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Cadastrar uma transação</Title>

        <FormContainer onSubmit={handleSubmit}>
          <div>
            <input
              placeholder="Titulo"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <input
              placeholder="Valor"
              type="number"
              value={value}
              min={1}
              onChange={e => setValue(Number(e.target.value))}
            />
          </div>
          <input
            placeholder="Categoria"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />

          <ButtonsContainer>
            <button
              type="button"
              onClick={() => setType('income')}
              className={type === 'income' ? 'income' : ''}
            >
              <FiArrowUpCircle color="12A454" size={20} />
              <span>Entrada </span>
            </button>
            <button
              type="button"
              onClick={() => setType('outcome')}
              className={type === 'outcome' ? 'outcome' : ''}
            >
              <FiArrowDownCircle color="E83F5B" size={20} />
              <span> Saída</span>
            </button>
          </ButtonsContainer>

          <button type="submit">Enviar</button>
        </FormContainer>
      </Container>
    </>
  );
};

export default Register;
