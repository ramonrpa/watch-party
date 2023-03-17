import { transparentize } from 'polished';
import styled from 'styled-components';
import { Small } from '~/styles/typography';
import LogoSvg from '../../assets/logo.svg';

export const Container = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  background: url('/assets/images/background.png');
  background-position: center;
  background-size: cover;

  ::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: ${({ theme }) =>
      transparentize(0.1, theme.colors.background)};
    z-index: -1;
  }
`;

export const Card = styled.div`
  width: 25rem;
  background-color: #f3f7f8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 0.1rem 0.5rem 0 ${({ theme }) => theme.colors.background};
`;

export const Logo = styled(LogoSvg)`
  width: 7rem;
  height: auto;
  margin-bottom: 3rem;
  filter: drop-shadow(0 0.5rem 0.3rem ${({ theme }) => theme.colors.secondary});
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 0.8rem;
  width: 100%;
  position: relative;
  border-radius: 0.5rem;
  border: solid 1px ${({ theme }) => theme.colors.background};
  background: #f3f7f8;
  background-clip: padding-box;

  > input {
    appearance: none;
    outline: none;
    background: transparent;
    border: none;
    width: 100%;
    color: ${({ theme }) => theme.colors.background};

    ::placeholder {
      color: ${({ theme }) => transparentize(0.8, theme.colors.background)};
    }
  }

  label {
    position: absolute;
    top: 0;
    left: 0.5rem;
    padding: 0 0.3rem;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.background};
    background-color: #f3f7f8;
    transform: translate(0, -65%);
  }
`;

export const InputList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 3rem 0;
`;

export const SwitchText = styled(Small)`
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: 1rem;

  b {
    cursor: pointer;
  }
`;
