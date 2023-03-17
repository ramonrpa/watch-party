import styled, { DefaultTheme, keyframes } from 'styled-components';

const handleType = (type) => {
  switch (type) {
    case 'success':
      return 'check_circle';
    default:
      return `${type}`;
  }
};

const toastInRight = keyframes`
  from {
	  transform: translateX(100%);
	}
	to {
	  transform: translateX(0);
	}
`;

interface ContainerProps {
  show: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${(props: ContainerProps) =>
    props.show ? '1rem 1.5rem 1rem 1rem' : '0'};
  margin-bottom: ${(props: ContainerProps) => (props.show ? '1rem' : '0')};
  width: 20rem;
  min-height: ${(props: ContainerProps) => (props.show ? '4rem' : '0')};
  max-height: ${(props: ContainerProps) => (props.show ? '20rem' : '0')};
  border-radius: 0.5rem;
  background-color: #fff;
  cursor: pointer;
  transition: transform 0.1s ease-in-out, max-height 0.3s ease-in-out 0.2s,
    min-height 0.3s ease-in-out 0.2s, padding 0.3s ease-in-out 0.2s,
    margin-bottom 0.3s ease-in-out 0.2s;
  animation: ${toastInRight} 0.5s;
  position: relative;
  box-shadow: 0 1px 10px 0 rgb(0 0 0 / 10%), 0 2px 15px 0 rgb(0 0 0 / 5%);

  ${(props: ContainerProps) => !props.show && 'transform: translateX(150%);'}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h4`
  font-size: 1rem;
  font-weight: 550;
  color: ${(props) => props.theme.colors.secondary};
`;

export const Description = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.secondary};
`;

interface IconProps {
  type: 'info' | 'success' | 'warning' | 'error';
  theme: DefaultTheme;
}

export const Icon = styled.span.attrs({ className: 'material-icons' })`
  font-size: 1.8rem;
  color: ${(props: IconProps) => props.theme.colors[props.type]};
  ::before {
    content: '${(props: IconProps) => handleType(props.type)}';
  }
`;

export const CloseButton = styled.span.attrs({ className: 'material-icons' })`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.secondary};

  ::before {
    content: 'close';
  }
`;
