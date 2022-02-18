import React from "react";
import styled from "styled-components";
import {
  spacing03,
  spacing05,
  spacing06,
  spacing07
} from "@carbon/layout";
import { defaultBackground } from "./common";
import Button from "carbon-components-react/lib/components/Button";
import { useSession } from "../session";
import logo from "./metlife_eng_logo_rgb.svg";
import SearchIcon from "@carbon/icons-react/lib/search/16";
import LogoutIcon from "@carbon/icons-react/lib/logout/16";


const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${spacing05} 0;
  background-color: #ffffff;
  font-size: 4vw;
  font-weight: 600;
  line-height: normal;
  @media (min-width: 100rem) {
    font-size: 4rem;
  }
`;

const Container = styled.nav`
  background-color: #ffffff;
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
const Logo = styled.img`
  height: 1.5em;
  margin-right: 1.5em;
`;

export default function AppBanner_splash() {
  return (
    <container>
      <content>
        <Header>
          <Logo src={logo} />
          </Header>
          <Spacer />
        </content>
    </container>
  );
}
