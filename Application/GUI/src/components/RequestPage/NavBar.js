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

const Container = styled.nav`
  background-color: #0061a0;
  padding: 16px 0 32px 0;
  @media (max-width: 52rem) {
    margin: -8px 0;
    padding: 0;
  }
`;

const Content = styled.div`
  display: flex;
  margin: 0 8vw;
  color: #ffffff;
  align-items: center;
  @media (min-width: 100rem) {
    margin: 0 auto;
    max-width: 83rem;
  }
`;
const SectionHeading = styled.h2`
  margin-bottom: ${spacing05};
  align-items: left;
`;

const SubHeading = styled.h5`
  margin: ${spacing07} 0 ${spacing05} 0;
  align-items: left;
`;

const Spacer = styled.div`
  flex: 1 0 ${spacing06};
`;

const ProgressLabel = styled(Heading01)`
  padding-right: ${spacing06};
  @media (max-width: 60rem) {
    display: none;
  }
`;


export default function NavBar() {
  return (
    <Container>
      <Content>
        <SubHeading>Coverage & Pricing</SubHeading>
      </Content>
      <Content>
        <SectionHeading>Long Term Care</SectionHeading>
      </Content>
    </Container>

  );
}
