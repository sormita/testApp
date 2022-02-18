import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "carbon-components-react/lib/components/Button";
import {
  ProgressIndicator,
  ProgressStep
} from "carbon-components-react/lib/components/ProgressIndicator";
import SearchIcon from "@carbon/icons-react/lib/search/16";
import LogoutIcon from "@carbon/icons-react/lib/logout/16";
import { useSession } from "../session";
import { defaultBackground, Heading01 } from "../common";

import {
  spacing03,
  spacing05,
  spacing06,
  spacing07
} from "@carbon/layout";

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

const RequestProgressIndicator = styled(ProgressIndicator)`
  @media (max-width: 52rem) {
    display: none;
  }
`;

function RequestProgress({ step }) {
  return (
    <RequestProgressIndicator currentIndex={step - 1}>
      <ProgressStep label="Step 1" description="Submit an information request" />
      <ProgressStep label="Step 2" description="Analysis of the request" />
      <ProgressStep label="Step 3" description="Process request" secondaryLabel="Optional" />
      <ProgressStep label="Step 4" />
    </RequestProgressIndicator>
  );
}

RequestProgress.propTypes = {
  step: PropTypes.number.isRequired
};

export default function NavBar() {
  const { logout } = useSession();

  return (
    <Container>
      <Content ><SectionHeading>Beneficiaries</SectionHeading>
      </Content>
    </Container>
  );
}
