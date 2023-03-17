import { transparentize } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.colors.secondary};
  box-shadow: -0.2rem 0 0.2rem 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  overflow-y: scroll;
  gap: 1rem;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 0 2rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};

  > h4 {
    margin-bottom: 1rem;
  }

  > span {
    display: flex;
    gap: 0.5rem;
  }

  input,
  button {
    appearance: none;
    outline: none;
    border: none;
  }

  input {
    background: ${({ theme }) => transparentize(0.1, theme.colors.background)};
    border-radius: 0.2rem;
    padding: 0.8rem;
    color: #fff;
    flex: 1;
    width: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
    padding: 0.8rem 0.6rem;
    font-size: 0.8rem;
    cursor: pointer;
    border-radius: 0.2rem;
    background: ${({ theme }) => transparentize(0.1, theme.colors.primary)};
    color: #fff;

    span {
      font-size: 1rem;
    }

    :disabled {
      filter: grayscale(0.5);
    }
  }
`;
