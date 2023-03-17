import styled, { css, DefaultTheme } from 'styled-components';

interface Props {
  value: number;
  min: number;
  max: number;
  color?: string;
  theme: DefaultTheme;
}

const Range = styled.input.attrs({ type: 'range' })`
  display: block;
  appearance: none;
  width: 100%;
  height: 0.5rem;
  cursor: pointer;
  background: transparent;

  :focus {
    outline: none;
  }

  ::-webkit-slider-runnable-track {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    ${(props: Props) => {
      const value = (100 * (props.value - props.min)) / (props.max - props.min);
      return css`
        background: linear-gradient(
          to right,
          ${props.color || props.theme.colors.primary} 0%,
          ${props.color || props.theme.colors.primary} ${value.toFixed(2)}%,
          #aaa ${value.toFixed(2)}%,
          #aaa 100%
        );
      `;
    }};
  }

  ::-webkit-slider-thumb {
    position: relative;
    appearance: none;
    height: 1rem;
    width: 1rem;
    background: ${(props: Props) => props.color || props.theme.colors.primary};
    border-radius: 100%;
    border: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: background-color 150ms;
  }

  :disabled {
    cursor: default;
    filter: grayscale(0.5);
  }
`;

export default Range;
