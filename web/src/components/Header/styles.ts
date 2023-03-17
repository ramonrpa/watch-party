import { transparentize } from 'polished';
import styled from 'styled-components';

export const Container = styled.header`
  background: ${({ theme }) => transparentize(0.8, theme.colors.background)};
  backdrop-filter: blur(50px);

  padding: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  color: #fff;
`;
