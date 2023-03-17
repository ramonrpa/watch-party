import { darken, lighten } from 'polished';
import styled from 'styled-components';

export const Container = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.colors.secondary};
  box-shadow: -0.2rem 0 0.2rem 0 rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
  overflow-y: scroll;
  overflow-x: hidden;
  justify-content: flex-end;
  flex: 1 1 1px;
`;

export const InputContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => darken(0.03, theme.colors.secondary)};
  padding: 0.5rem 0.8rem;
  display: flex;
  align-items: center;

  input {
    appearance: none;
    outline: none;
    border: 2px solid ${({ theme }) => theme.colors.background};
    width: 100%;
    color: #fff;
    padding: 0.8rem;
    background: transparent;
    border-radius: 1rem;
  }

  span {
    position: absolute;
    right: 1.4rem;
    background-color: ${({ theme }) => lighten(0.5, theme.colors.primary)};
    color: ${({ theme }) => theme.colors.secondary};
    border-radius: 50%;
    padding: 0.3rem;
    font-size: 1.2rem;
    cursor: pointer;
  }
`;
