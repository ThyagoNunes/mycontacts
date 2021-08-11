import {
  Container, InputSearchContainer, Header, ListContainer, Card,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
  return (
    <Container>

      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar Contato" />
      </InputSearchContainer>

      <Header>
        <strong>3 contatos</strong>
        <a href="/new">Novo contato</a>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="arrow" />
          </button>
        </header>
      </ListContainer>

      <Card>
        <div className="info">
          <div className="contact-name">
            <strong>Thyago Nunes</strong>
            <small>LinkedIn</small>
          </div>
          <span>devthyagonunes@gmail.com</span>
          <span>(81)99999-9999</span>
        </div>

        <div className="actions">
          <a href="/edit">
            <img src={edit} alt="Edit" />
          </a>
          <button type="button">
            <img src={trash} alt="Delete" />
          </button>
        </div>
      </Card>
      <Card>
        <div className="info">
          <div className="contact-name">
            <strong>Thyago Nunes</strong>
            <small>LinkedIn</small>
          </div>
          <span>devthyagonunes@gmail.com</span>
          <span>(81)99999-9999</span>
        </div>

        <div className="actions">
          <a href="/edit">
            <img src={edit} alt="Edit" />
          </a>
          <button type="button">
            <img src={trash} alt="Delete" />
          </button>
        </div>
      </Card>
      <Card>
        <div className="info">
          <div className="contact-name">
            <strong>Thyago Nunes</strong>
            <small>LinkedIn</small>
          </div>
          <span>devthyagonunes@gmail.com</span>
          <span>(81)99999-9999</span>
        </div>

        <div className="actions">
          <a href="/edit">
            <img src={edit} alt="Edit" />
          </a>
          <button type="button">
            <img src={trash} alt="Delete" />
          </button>
        </div>
      </Card>
    </Container>
  );
}
