import React, { useState } from "react";
import styled from "styled-components";
import Form from "carbon-components-react/lib/components/Form";
import TextInput from "carbon-components-react/lib/components/TextInput";
import Button from "carbon-components-react/lib/components/Button";
import { spacing02, spacing03, spacing06, spacing07 } from "@carbon/layout";
import { useSession } from "../session";
import { theme, BackgroundPane, Label01, HelperText01 } from "../common";
import { getLog } from "../../api";
const Container = styled(BackgroundPane)`
  width: 100%;
  max-width: 30rem;
  padding: ${spacing07};
`;

const Heading = styled.h3`
  margin-bottom: ${spacing02};
`;

const InputContainer = styled.div`
  margin-top: ${spacing06};
`;

const ErrorMessage = styled(Label01)`
  min-height: 1rem;
  margin: ${spacing03} 0 ${spacing06} 0;
  color: ${theme.danger};
`;

// TODO: Ugly work around for session storage problem
const backingStorage = window.sessionStorage;

const storage = {
  getItem: key => {
    try {
      const value = backingStorage.getItem(key);
      return value != null ? JSON.parse(value) : undefined;
    } catch (err) {
      console.error(err);
    }
  },
  setItem: (key, value) => {
    try {
      backingStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(err);
    }
  },
  removeItem: key => {
    try {
      backingStorage.removeItem(key);
    } catch (err) {
      console.error(err);
    }
  }
};

export default function LoginForm() {
  const { error, pending, login } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    
    login(username, password);
    // TODO Barry - This would be a good place to for Kafka Login event sendMessage
  }

  return (
    <Container as={Form} onSubmit={handleSubmit}>
      <Heading>Log in</Heading>
      <HelperText01>Please enter your credentials below.</HelperText01>
      <InputContainer>
        <TextInput
          type="text"
          id="username"
          autoComplete="username"
          labelText="Username"
          autoFocus
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <TextInput
          type="password"
          id="password"
          autoComplete="current-password"
          labelText="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </InputContainer>
      <ErrorMessage>{!pending && error}</ErrorMessage>
      <Button type="submit" disabled={pending || !username || !password}>
        Log in
      </Button>
    </Container>
  );
}
