import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.8rem;

  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.8) 5%,
    rgba(255, 255, 255, 0) 50%,
    rgba(0, 0, 0, 0.9) 95%
  );
  opacity: ${(props: { show: boolean }) => (props.show ? '1' : '0')};
  cursor: ${(props: { show: boolean }) => (props.show ? 'default' : 'none')};
  transition: 0.5s all;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;

  > input {
    width: 8rem;
  }
`;

export const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex: 1;

  > button {
    background: transparent;
    color: #fff;
    padding: 0.3rem;
    font-size: 2.2rem;
    cursor: pointer;
    border: 1px solid #fff;
    border-radius: 50%;

    :disabled {
      cursor: default;
      color: #888;
      border: 1px solid #888;
    }
  }

  > p {
    color: #aaa;
    font-size: 1rem;
  }
`;

export const RightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  flex: 1;

  > button {
    background: transparent;
    color: #fff;
    font-size: 1.8rem;
    cursor: pointer;
    border: none;
  }
`;
