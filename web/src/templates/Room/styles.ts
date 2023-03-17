import { transparentize, darken, lighten } from 'polished';
import styled, { css, DefaultTheme } from 'styled-components';
import { Paragraph } from '~/styles/typography';

export const Container = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;

  display: flex;

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

  @media (max-width: 800px) and (orientation: portrait) {
    flex-direction: column;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  min-width: ${(props: { show: boolean }) => (props.show ? '25rem' : '0rem')};
  max-width: ${(props: { show: boolean }) => (props.show ? '25rem' : '0rem')};

  transition: 0.3s all;

  @media (max-width: 800px) and (orientation: portrait) {
    min-width: 100%;
    max-width: 100%;
  }
`;

export const TabHeader = styled.div`
  display: flex;
  background: ${({ theme }) => darken(0.03, theme.colors.secondary)};
`;

interface TabItemProps {
  active: boolean;
  theme: DefaultTheme;
}

export const TabItem = styled(Paragraph)`
  text-align: center;
  width: 100%;

  padding: 1rem;
  color: ${(props: TabItemProps) =>
    props.active ? '#fff' : lighten(0.3, props.theme.colors.secondary)};
  cursor: pointer;
  ${(props: TabItemProps) =>
    props.active &&
    css`
      border-bottom: 1px solid #fff;
    `}
`;

export const TabContent = styled.div`
  height: 100%;
`;

export const HideShow = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: absolute;
  top: 0;
  right: ${(props: { showTabs: boolean }) =>
    props.showTabs ? '25rem' : '0rem'};
  background: ${({ theme }) => darken(0.03, theme.colors.secondary)};
  padding: 1rem 0.8rem;
  border-radius: 0.5rem 0 0 0.5rem;
  transition: 0.3s all ease-in-out;
  max-width: 3rem;
  overflow: hidden;

  > p {
    font-size: 1rem;
  }

  > span {
    font-size: 2rem;
  }

  :hover {
    max-width: 10rem;
  }

  @media (max-width: 800px) and (orientation: portrait) {
    display: none;
  }
`;
