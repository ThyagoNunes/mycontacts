import PropTypes from 'prop-types';
import React, { useState } from 'react';

import isEmailValid from '../../utils/isEmailValid';

import { Form, ButtonContainer } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState([]);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setErrors((prevState) => [
        ...prevState,
        { field: 'name', message: 'Nome é obrigatório' },
      ]);
    } else {
      setErrors((prevState) => prevState.filter(
        (error) => error.field !== 'name',
      ));
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      const errorAlreadyExists = errors.find((error) => error.field === 'email');

      if (errorAlreadyExists) {
        return;
      }

      setErrors((prevState) => [
        ...prevState,
        { field: 'email', message: 'Email Inválido' },
      ]);
    } else {
      setErrors((prevState) => prevState.filter(
        (error) => error.field !== 'email',
      ));
    }
  }

  console.log(errors);

  function handleSubmit(event) {
    event.preventDefault();

    console.log({
      name, email, phone, birth, category,
    });
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
        </FormGroup>

        <FormGroup>
          <Input
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
          />
        </FormGroup>

        <FormGroup>
          <Input
            placeholder="Telefone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Input
            type="date"
            placeholder="dd-mm-yyyy"
            value={birth}
            onChange={(event) => setBirth(event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Categorias</option>
            <option value="Instagram">Instagram</option>
            <option value="Youtube">Youtube</option>
            <option value="Discord">Discord</option>
          </Select>
        </FormGroup>

        <ButtonContainer>
          <Button type="submit">
            { buttonLabel }
          </Button>
        </ButtonContainer>
      </Form>
    </>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
