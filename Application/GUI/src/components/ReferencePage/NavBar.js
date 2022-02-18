import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "carbon-components-react/lib/components/Button";
import {
  ProgressIndicator,
  ProgressStep
} from "carbon-components-react/lib/components/ProgressIndicator";
import { spacing06 } from "@carbon/layout";
import SearchIcon from "@carbon/icons-react/lib/search/16";
import LogoutIcon from "@carbon/icons-react/lib/logout/16";
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
  align-items: center;
  @media (min-width: 100rem) {
    margin: 0 auto;
    max-width: 83rem;
  }
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
      <Content>
        <Button
          kind="ghost"
          size="field"
          renderIcon={SearchIcon}
          iconDescription="Search"
          tooltipPosition="top"
          hasIconOnly
        ></Button>
        <Spacer />
        <Button kind="ghost" size="field" renderIcon={LogoutIcon} onClick={() => logout()}>
          Log out
        </Button>
      </Content>
    </Container>
  );
}
