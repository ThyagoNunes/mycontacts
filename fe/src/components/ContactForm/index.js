import PropTypes from "prop-types";
import { useState, createContext } from "react";

import isEmailValid from "../../utils/isEmailValid";
import formatPhone from "../../utils/formatPhone";
import useErrors from "../../hooks/useErrors";

import { Form, ButtonContainer } from "./styles";

import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import Text from "../Text";

const context = createContext("");

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ageDate, setAgeDate] = useState("");
  const [category, setCategory] = useState("");

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (name && errors.length === 0 && phone.length >= 14);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      // representação booleana. '' = false !'' = true
      setError({ field: "name", message: "Nome é obrigatório" });
    } else {
      removeError("name");
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: "email", message: "E-mail inválido" });
    } else {
      removeError("email");
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));

    console.log(event.target.value);
    const countPhoneChar = event.target.value;

    console.log(countPhoneChar.length);
    if (countPhoneChar.length < 13) {
      setError({ field: "phone", message: "Telefone Inválido" });
    } else {
      removeError("phone");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log({
      name,
      email,
      phone,
      ageDate,
      category,
    });
  }

  return (
    <context.Provider
      value={{
        onGetErrorMessageByFieldName: getErrorMessageByFieldName,
      }}
    >
      <Form onSubmit={handleSubmit} noValidate>
        <FormGroup error={getErrorMessageByFieldName("name")}>
          <Input
            error={getErrorMessageByFieldName("name")}
            value={name}
            placeholder="Nome *"
            onChange={handleNameChange}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName("email")}>
          <Input
            type="email"
            error={getErrorMessageByFieldName("email")}
            value={email}
            placeholder="Email"
            onChange={handleEmailChange}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName("phone")}>
          <Input
            error={getErrorMessageByFieldName("phone *")}
            value={phone}
            placeholder="Telefone"
            onChange={handlePhoneChange}
            maxLength="15"
          />
        </FormGroup>

        <FormGroup>
          <Text>Data nascimento:</Text>
          <Input
            type="date"
            value={ageDate}
            onChange={(event) => setAgeDate(event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Categorias</option>
            <option value="Instagram">Instagram</option>
            <option value="Discord">Discord</option>
            <option value="Youtube">Youtube</option>
            <option value="LinkedIn">LinkedIn</option>
          </Select>
        </FormGroup>

        <ButtonContainer>
          <Button type="submit" disabled={!isFormValid}>
            {buttonLabel}
          </Button>
        </ButtonContainer>
      </Form>
    </context.Provider>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
