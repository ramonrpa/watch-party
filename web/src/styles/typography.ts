import styled from 'styled-components';

interface Props {
  type?: 'regular' | 'bold';
  textTransform?: string;
  color?: string;
}

export const H1 = styled.h1`
  font-size: 2.4rem;
  font-weight: ${(props: Props) => (props.type === 'bold' ? 'bold' : 400)};
  text-transform: ${(props: Props) => props.textTransform || 'none'};
  color: ${(props: Props) => props.color || '#fff'};
  white-space: pre-line;
`;

export const H2 = styled.h2`
  font-size: 1.95rem;
  font-weight: ${(props: Props) => (props.type === 'bold' ? 'bold' : 400)};
  text-transform: ${(props: Props) => props.textTransform || 'none'};
  color: ${(props: Props) => props.color || '#fff'};
  white-space: pre-line;
`;

export const H3 = styled.h3`
  font-size: 1.5rem;
  font-weight: ${(props: Props) => (props.type === 'bold' ? 'bold' : 400)};
  text-transform: ${(props: Props) => props.textTransform || 'none'};
  color: ${(props: Props) => props.color || '#fff'};
  white-space: pre-line;
`;

export const H4 = styled.h4`
  font-size: 1.25rem;
  font-weight: ${(props: Props) => (props.type === 'bold' ? 'bold' : 400)};
  text-transform: ${(props: Props) => props.textTransform || 'none'};
  color: ${(props: Props) => props.color || '#fff'};
  white-space: pre-line;
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  font-weight: ${(props: Props) => (props.type === 'bold' ? 'bold' : 400)};
  text-transform: ${(props: Props) => props.textTransform || 'none'};
  color: ${(props: Props) => props.color || '#fff'};
  white-space: pre-line;
`;

export const Small = styled.p`
  font-size: 0.75rem;
  font-weight: ${(props: Props) => (props.type === 'bold' ? 'bold' : 400)};
  text-transform: ${(props: Props) => props.textTransform || 'none'};
  color: ${(props: Props) => props.color || '#fff'};
  white-space: pre-line;
`;
