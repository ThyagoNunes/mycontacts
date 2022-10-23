import { Container } from './styles';
import dog404 from '../../assets/images/404.jpg';

export default function NotFound() {
  return (
    <Container>
      <img src={dog404} alt="DOG error 404 not found" />
    </Container>
  );
}
