import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const load = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary} 10%,
    rgba(255, 255, 255, 0) 42%
  );
  position: relative;
  transform: translateZ(0);
  animation: ${load} 1.4s infinite linear;
  margin-bottom: 1.5rem;

  ::before {
    width: 50%;
    height: 50%;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }

  ::after {
    background-color: ${({ theme }) => theme.colors.background};
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;
