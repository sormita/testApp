import React from "react";
import styled from "styled-components";
import { layout01 } from "@carbon/layout";
import { CustomPage, AppBanner_splash } from "../common";
import LoginForm from "./LoginForm";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  padding: ${layout01};
`;

export default function LoginPage() {
  return (
    <>
      <CustomPage fullHeight />
      <PageContainer>
        <AppBanner_splash />
        <FormContainer>
          <LoginForm />
        </FormContainer>
      </PageContainer>
    </>
  );
}
