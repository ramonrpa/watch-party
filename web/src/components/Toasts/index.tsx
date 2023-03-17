import { useAppSelector } from '~/store/hooks';
import { Container } from './styles';
import Toast from '../Toast';

const Toasts = () => {
  const { toasts } = useAppSelector((state) => state);

  return (
    <Container>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </Container>
  );
};

export default Toasts;
