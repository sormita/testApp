import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import { rem, breakpoints } from "@carbon/layout";
import { g10, white } from "@carbon/themes";
import {
  heading01,
  label01,
  helperText01,
  bodyShort01,
  bodyShort02,
  bodyLong01
} from "@carbon/type";

export const theme = g10;
export const defaultBackground = white.uiBackground;

export const CustomPage = createGlobalStyle`
  html {
    ${props => (props.fullHeight ? "height: 100%" : "")}
  }
  body {
    ${props => (props.background ? `background: ${props.background};` : "")}
    ${props => (props.fullHeight ? "height: 100%" : "")}
  }
  div#root {
    ${props => (props.fullHeight ? "height: 100%" : "")}
  }
`;

CustomPage.propTypes = {
  fullHeight: PropTypes.bool,
  background: PropTypes.string
};

// Magic number: breakpoints.max.width + margin in @carbon/layout
const maxPageWidth = rem(1584 + 24);

export const PageMargin = styled.div`
  margin: 0;
  @media (min-width: ${breakpoints.md.width}) {
    margin: 0 ${breakpoints.md.margin};
  }
  @media (min-width: ${breakpoints.lg.width}) {
    margin: 0 ${breakpoints.lg.margin};
  }
  @media (min-width: ${breakpoints.xlg.width}) {
    margin: 0 ${breakpoints.xlg.margin};
  }
  @media (min-width: ${breakpoints.max.width}) {
    margin: 0 ${breakpoints.max.margin};
  }
  @media (min-width: ${breakpoints.max.width}) {
    margin: 0 ${breakpoints.max.margin};
  }
  @media (min-width: ${maxPageWidth}) {
    max-width: ${breakpoints.max.width};
    margin: 0 auto;
  }
`;

export const BackgroundPane = styled.div`
  background: ${g10.uiBackground};
`;

export const Heading01 = styled.div(heading01);
// <h1>-<h6> are heading02-heading07 by default

export const Label01 = styled.p(label01);
export const HelperText01 = styled.p(helperText01);

export const BodyShort01 = styled.p(bodyShort01);
export const BodyLong01 = styled.p(bodyLong01);
export const BodyShort02 = styled.p(bodyShort02);
// <p> is BodyLong02 by default

export { default as AppBanner } from "./AppBanner";
export { default as AppBanner_splash} from "./AppBanner_splash";
