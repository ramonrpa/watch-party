import React, { useState } from 'react';
import useTimeout from '~/hooks/useTimeout';
import { useAppDispatch } from '~/store/hooks';
import { removeToast, Toast as IToast } from '~/store/reducers/toasts.reducer';
import {
  CloseButton,
  Container,
  Content,
  Description,
  Icon,
  Title,
} from './styles';

const Toast: React.FC<IToast> = ({
  id,
  title,
  description,
  type = 'info',
  time = 5000,
}) => {
  const [show, setShow] = useState(true);
  const dispatch = useAppDispatch();

  const close = () => {
    setShow(false);
    setTimeout(() => {
      dispatch(removeToast(id));
    }, 400);
  };

  useTimeout(() => {
    close();
  }, time);

  return (
    <Container onClick={close} show={show}>
      <Icon type={type} />
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
      <CloseButton />
    </Container>
  );
};
export default Toast;
