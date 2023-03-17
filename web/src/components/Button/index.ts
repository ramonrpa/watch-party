import { darken, lighten } from 'polished';
import styled from 'styled-components';

const Button = styled.button`
  appearance: none;
  border: 0;
  outline: none;
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => darken(0.05, theme.colors.primary)} 100%
  );
  padding: 0.8rem 1.5rem;
  border-radius: 0.8rem;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: 0.3s all ease-in-out;
  border-bottom: 0.1rem solid
    ${({ theme }) => darken(0.2, theme.colors.primary)};

  :disabled {
    cursor: default;
    filter: grayscale(0.5);
  }

  :hover:enabled {
    background: linear-gradient(
      45deg,
      ${({ theme }) => lighten(0.1, theme.colors.primary)} 0%,
      ${({ theme }) => lighten(0.05, theme.colors.primary)} 100%
    );
    box-shadow: 0 0 0.5rem 0 ${({ theme }) => theme.colors.primary};
  }
`;

export default Button;
