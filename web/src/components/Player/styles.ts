import styled from 'styled-components';
import { H1 } from '~/styles/typography';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background};
  position: relative;
`;

export const AwaitMessage = styled(H1)`
  padding: 1rem;
  text-align: center;
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke-width: 0.025rem;
  -webkit-text-stroke-color: #fff;
`;
