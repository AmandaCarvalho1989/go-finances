import styled from 'styled-components';
import { shade, lighten } from 'polished';

export const Title = styled.h1`
  font-weight: 500;
  font-size: 36px;
  line-height: 54px;
  color: #363f5f;
  text-align: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 736px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const FormContainer = styled.form`
  margin-top: 20px;
  border-radius: 5px;
  padding: 64px;
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;

    button + button {
      flex: 1;
    }
  }

  input {
    padding: 32px;
    height: 50px;
    border-radius: 5px;
    background: #fff;
    border: 0;

    /* & + input {
      margin-top: 20px;
    } */
  }
  button[type='submit'] {
    background: #ff872c;
    color: #fff;
    border-radius: 5px;
    padding: 15px 80px;
    border: 0;
    transition: background-color 0.2s;
    margin-top: 30px;

    &:hover {
      background: ${shade(0.2, '#ff872c')};
    }
  }
`;

export const ButtonsContainer = styled.section`
  margin-top: 40px;
  display: flex;
  color: #969cb3;

  button {
    height: 30px;
    border: 2.3px solid #d5d7de;
    background: transparent;
    padding: 28px;
    border-radius: 5px;
    display: flex;
    align-items: center;

    & + button {
      margin-left: 20px;
    }

    &.income {
      background: ${lighten(0.4, '#12a454')};
      border: 2px solid ${lighten(0.4, '#12a454')};
    }

    &.outcome {
      background: ${lighten(0.2, '#e83f5b')};
      border: 2px solid ${lighten(0.4, '#e83f5b')};
    }
    span {
      margin-left: 4px;
    }
  }
`;
