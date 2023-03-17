import { Paragraph } from '~/styles/typography';
import { Container, Spinner } from './styles';

const Loading = () => (
  <Container>
    <Spinner />
    <Paragraph>Conectando ao servidor...</Paragraph>
  </Container>
);

export default Loading;
