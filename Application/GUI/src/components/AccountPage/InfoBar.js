import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import {
  spacing03,
  spacing05,
  spacing06,
  spacing07
} from "@carbon/layout";

import { useSession } from "../session";
import { defaultBackground, Heading01 } from "../common";
import { heading03 } from "@carbon/type";

const Container = styled.nav`
  background-color: #0090da;
  padding: 16px 0 16px 0;
  position: relative;
  float: right;
  width:70%;
  left:100 px; top: -25px; 
  @media (max-width: 180rem) {
    margin: -16px 0;
    padding: 10;
  }
`;

const Content = styled.div`
  display: flex;
  margin: 0 8vw;
  color: #ffffff;
  align-items: left;
  @media (min-width: 40 rem) {
    margin: 0 auto;
    max-width: 500rem;
  }
`;
const Column = styled.div`
  display: block;
  margin: 0 3vw;
  color: #ffffff;
  align-items: left;
  
`;
const SectionHeading = styled.h2`
  align-items: left;
`;

const SubHeading = styled.h6`
    align-items: left;
`;

const Spacer = styled.div`
  flex: 1 0 ${spacing06};
`;



export default function InfoBar() {
  const backingStorage = window.sessionStorage;
  const userKey = "mock.api.user";
  const user = JSON.parse(backingStorage.getItem(userKey));


  //console.log("USER IN INFOBAR" + JSON.stringify(user));
  //const policy = "abc";
  return (
    <Container>
      <Content>
        <Column>
          <SubHeading>Policy no</SubHeading>
          <SubHeading>{user.policy}</SubHeading>
        </Column>
        <Column>
          <SubHeading>Employer</SubHeading>
          <SubHeading>Open Inc</SubHeading>
        </Column>
        <Column>
          <SubHeading>You Pay</SubHeading>
          <SubHeading>$260/month</SubHeading>
        </Column>
        <Column>
          <SubHeading>Family Members</SubHeading>
          <SubHeading>3</SubHeading>
        </Column>
        <Column>
          <SubHeading>HSA Balance</SubHeading>
          <SubHeading>$5892.00</SubHeading>
        </Column>
      </Content>
    </Container>

  );
}
