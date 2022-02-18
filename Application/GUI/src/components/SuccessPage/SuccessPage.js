import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Form from "carbon-components-react/lib/components/Form";
import TextArea from "carbon-components-react/lib/components/TextArea";
import Button from "carbon-components-react/lib/components/Button";
import Tag from "carbon-components-react/lib/components/Tag";
import {
  breakpoints,
  layout01,
  layout02,
  spacing03,
  spacing05,
  spacing06,
  spacing07
} from "@carbon/layout";
import { theme, CustomPage, PageMargin, AppBanner } from "../common";
import NavBar from "./NavBar";

const breakpoint = breakpoints.md.width;

const PageContainer = styled(PageMargin)`
  display: flex;
  flex-direction: column;
  @media (min-width: ${breakpoint}) {
    flex-direction: row;
  }
`;

const Column1 = styled.div`
  flex: 1 0 0;
  padding: 0 ${layout01};
  @media (min-width: ${breakpoint}) {
    padding: 0 ${layout02} 0 ${layout01};
  }
`;

const Column2 = styled.div`
  flex: 1 0 0;
  padding: 0 ${layout01};
  @media (min-width: ${breakpoint}) {
    padding: 0 ${layout01} 0 ${layout02};
  }
`;

const Section = styled.div`
  padding: ${layout02} 0;
`;

const SectionHeading = styled.h3`
  margin-bottom: ${spacing05};
`;

const SubHeading = styled.h4`
  margin: ${spacing07} 0 ${spacing05} 0;
`;

const InputContainer = styled.div`
  margin-bottom: ${spacing06};
`;

const Body = styled.p`
  margin: ${spacing03} 0;
`;

const TagContainer = styled.div`
  margin-bottom: ${spacing06};
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  padding: ${layout01};
`;


function SubmitSection() {
  return (
    <Section as={Form}>
      <SectionHeading>Analyze an information request</SectionHeading>
      <InputContainer>
        <TextArea labelText="Request text" cols={120} rows={8} />
      </InputContainer>
    </Section>
  );
}

function SuccessSection({ resultobj }) {
  if (resultobj == null) {
    return false;
  }

  return (
    <Section>
      <SectionHeading>Success</SectionHeading>
      <Body>process is complete.</Body>
    </Section>
  );
}

SuccessSection.propTypes = {
  resultobj: PropTypes.object
};

const resultobj = {
  success: "SUCCESS"
};

export default function SuccessPage() {
  return (
    <>
      <CustomPage background={theme.uiBackground} />
      <div>
        <AppBanner />
        <NavBar />
        <PageContainer>
          <FormContainer>
         
            <SuccessSection resultobj={resultobj} />
            </FormContainer>
          {/* <div style={{ background: "blue" }}>&nbsp;</div> */}
        </PageContainer>
      </div>
    </>
  );
}
