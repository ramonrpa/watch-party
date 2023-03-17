import { lighten } from 'polished';
import styled, { DefaultTheme } from 'styled-components';
import { Paragraph, Small } from '~/styles/typography';

interface Props {
  type: 'join' | 'leave' | 'text' | 'newOwner';
  isMe: boolean;
  theme: DefaultTheme;
}

export const Content = styled(Paragraph)`
  width: fit-content;
  padding: 0.5rem 0.8rem;
  border-radius: 0.8rem 0.8rem 0 0.8rem;
  font-weight: 450;
  max-width: 80%;
  font-size: 0.9rem;
  word-break: break-all;
`;

export const Author = styled(Small)`
  color: ${({ theme }) => lighten(0.3, theme.colors.secondary)};
  font-weight: bold;
  padding: 0 0.2rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props: Props) =>
    props.type === 'text'
      ? props.isMe
        ? 'flex-end'
        : 'flex-start'
      : 'center'};
  gap: 0.2rem;

  ${Content} {
    background: ${(props: Props) =>
      props.type === 'text'
        ? lighten(0.05, props.theme.colors.secondary)
        : 'transparent'};
    border-radius: ${(props: Props) =>
      props.isMe ? '0.8rem 0.8rem 0 0.8rem' : '0.8rem 0.8rem 0.8rem 0'};
    color: ${(props: Props) =>
      props.type === 'text'
        ? '#fff'
        : lighten(0.3, props.theme.colors.secondary)};
  }
`;
