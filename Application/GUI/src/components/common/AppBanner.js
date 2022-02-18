import React, { useState } from "react";
import ReactDOM from 'react-dom';
import styled from "styled-components";
import {
  spacing03,
  spacing05,
  spacing06,
  spacing07,
  spacing09
} from "@carbon/layout";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route
} from "react-router-dom";

import { defaultBackground } from "./common";
import Button from "carbon-components-react/lib/components/Button";
import { Grid, Row, Column } from "carbon-components-react/lib/components/Grid";
import { useSession } from "../session";
import logo from "./metlife_eng_logo_rgb.svg";
import SearchIcon from "@carbon/icons-react/lib/search/16";
import LogoutIcon from "@carbon/icons-react/lib/logout/16";
import { useHistory } from 'react-router-dom';
import { action } from '@storybook/addon-actions';

import OverflowMenu from "carbon-components-react/lib/components/OverflowMenu";
import OverflowMenuItem from "carbon-components-react/lib/components/OverflowMenuItem";
import Modal from "carbon-components-react/lib/components/Modal";

import {
  boolean,
  object,
  optionsKnob as options,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import Select from 'carbon-components-react/lib/components//Select';
import SelectItem from 'carbon-components-react/lib/components//SelectItem';
import TextInput from 'carbon-components-react/lib/components//TextInput';
import { getHello, getCluster } from "../../api";

const Container = styled.nav`
  background-color: ${defaultBackground};
  padding: 8px 0 16px 0;
  @media (max-width: 52rem) {
    display:none;
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

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 0;
  background-color: ${defaultBackground};
  font-size: 10vw;
  font-weight: 100;
  line-height: 5vw;
  
`;


const Spacer = styled.div`
  flex: 1 0 ${spacing06};
`;
const Logo = styled.img`
height: 0.75em; 

`;

const directions = {
  'Bottom of the trigger button (bottom)': 'bottom',
  'Top of the trigger button (top)': 'top',
};

const sizes = {
  'Small  (sm)': 'sm',
  'Medium (md) - default': undefined,
  'Large  (lg)': 'lg',
};
const buttons = {
  'None (0)': '0',
  'One (1)': '1',
  'Two (2)': '2',
  'Three (3)': '3',
};


const props = {
  menu: () => ({
    class: 'bx-btn',
    direction: select('Menu direction (direction)', directions, 'bottom'),
    ariaLabel: text('ARIA label (ariaLabel)', 'Menu'),
    iconDescription: text('Icon description (iconDescription)', ''),
    flipped: boolean('Flipped (flipped)', false),
    light: boolean('Light (light)', false),
    selectorPrimaryFocus: text(
      'Primary focus element selector (selectorPrimaryFocus)',
      ''
    ),
    size: select('Size (size)', sizes, undefined) || undefined,
    onClick: action('onClick'),
    onFocus: action('onFocus'),
    onKeyDown: action('onKeyDown'),
    onClose: action('onClose'),
    onOpen: action('onOpen'),
  }),
  menuItem: () => ({
    className: 'some-class',
    disabled: boolean('Disabled (disabled)', false),
    requireTitle: boolean(
      'Use hover over text for menu item (requireTitle)',
      false
    ),
    onClick: action('onClick'),
    hasDivider: boolean('Has divider (hasDivider)', false),
    isDelete: boolean('Is delete (isDelete)', false),
  }),

  modal: () => ({
    numberOfButtons: options('Number of Buttons', buttons, '2', {
      display: 'inline-radio',
    }),
    className: 'some-class',
    open: boolean('Open (open)', true),
    danger: boolean('Danger mode (danger)', false),
    alert: boolean('Alert mode (alert)', false),
    shouldSubmitOnEnter: boolean(
      'Enter key to submit (shouldSubmitOnEnter)',
      false
    ),
    hasScrollingContent: boolean(
      'Modal contains scrollable content (hasScrollingContent)',
      false
    ),
    hasForm: boolean('Modal contains a form (hasForm)', false),
    modalHeading: text('Modal heading (modalHeading)', 'Modal heading'),
    modalLabel: text('Optional label (modalLabel)', 'Label'),
    modalAriaLabel: text(
      'ARIA label, used only if modalLabel not provided (modalAriaLabel)',
      'A label to be read by screen readers on the modal root node'
    ),
    selectorPrimaryFocus: text(
      'Primary focus element selector (selectorPrimaryFocus)',
      '[data-modal-primary-focus]'
    ),
    size: select('Size (size)', sizes, 'md'),
    iconDescription: text('Close icon description (iconDescription)', 'Close'),
    onBlur: action('onBlur'),
    onClick: action('onClick'),
    onFocus: action('onFocus'),
    onRequestClose: action('onRequestClose'),
    onRequestSubmit: action('onRequestSubmit'),
    onSecondarySubmit: action('onSecondarySubmit'),
    preventCloseOnClickOutside: boolean(
      'Prevent closing on click outside of modal (preventCloseOnClickOutside)',
      true
    ),
    primaryButtonDisabled: boolean(
      'Disable primary button (primaryButtonDisabled)',
      false
    ),
    primaryButtonText: text(
      'Primary button text (primaryButtonText)',
      'Primary button'
    ),
  }),
  modalFooter: (numberOfButtons) => {
    const secondaryButtons = () => {
      switch (numberOfButtons) {
        case '2':
          return {
            secondaryButtonText: text(
              'Secondary button text (secondaryButtonText in <ModalFooter>)',
              'Secondary button'
            ),
          };
        case '3':
          return {
            secondaryButtons: object(
              'Secondary button config array (secondaryButtons)',
              [
                {
                  buttonText: 'Keep both',
                  onClick: action('onClick'),
                },
                {
                  buttonText: 'Rename',
                  onClick: action('onClick'),
                },
              ]
            ),
          };
        default:
          return null;
      }
    };
    return {
      passiveModal: boolean(
        'Without footer (passiveModal)',
        false || numberOfButtons === '0'
      ),
      ...secondaryButtons(),
    };
  },
};

OverflowMenu.displayName = 'OverflowMenu';


export default function AppBanner() {
  const history = useHistory();

  const hsaChange = () => {
    let path = `/request`;

    history.push(path);


  }
  const accountChange = () => {
    let path = `/account`;
    history.push(path);
  }
  const claimsChange = () => {
    let path = `/claims`;
    history.push(path);
  }
  const formsChange = () => {
    let path = `/forms`;
    history.push(path);

  }
  const referenceChange = () => {
    let path = `/reference`;
    history.push(path);

  }
  const { logout } = useSession();
  const { user } = useSession();
  const ShowProfile = () => {
  
    const prof= "Current Profile is a,b,c,\n and d,e,f";
    
    //for debugging
    alert(JSON.stringify(user));
    
    // Individual field
    //alert(user.demographics);
  
  };

  const chat = () => {

    var path = window.location.pathname;

    if (path != '/login') {

      window.watsonAssistantChatOptions = {
        integrationID: "9cf9a5d4-50b3-4d4d-b4c7-7f0710c80d8d", // The ID of this integration.
        region: "us-south", // The region your integration is hosted in.
        serviceInstanceID: "fe3ab7e7-796b-4d56-93e1-c0d158eea155", // The ID of your service instance.
        onLoad: function (instance) { instance.render(); }
      };
      setTimeout(function () {
        const t = document.createElement('script');
        t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js";
        document.head.appendChild(t);
      });
    }
  }
  
  async function TestAPI() {
    console.log('TESTAPI calling');
    //const result = await resolveCall();
    getHello(user).then((apiResult) => {
      alert(JSON.stringify(apiResult));
    });
   
  }

  async function GetCluster() {
    console.log('GETCLUSTER calling');
    //const result = await resolveCall();
    getCluster(user).then((apiResult) => {
      alert(JSON.stringify(apiResult));
    });
   
  }
  

  return (
    <Container>
      <Content>
        <Header>


          <Logo src={logo} />



          <Button kind="ghost" size="field" onClick={accountChange} position="relative" >Overview</Button>
          <Spacer />


          <Button kind="ghost" size="field" onClick={claimsChange} >Claims</Button>
          <Spacer />

          <Button kind="ghost" size="field" onClick={referenceChange} >Reference</Button>
          <Spacer />


          <Button kind="ghost" size="field" onClick={hsaChange} >HSA</Button>
          <Spacer />
          <Button kind="ghost" size="field" onClick={formsChange} >Forms</Button>
          <Spacer />


          <Button
            kind="ghost"
            size="field"
            renderIcon={SearchIcon} >
          </Button>
          <Spacer />

          <Button kind="ghost" size="field" renderIcon={LogoutIcon} onClick={() => logout()} >
            Log out
          </Button>
          <Spacer />

          <OverflowMenu size="field" >
            <OverflowMenuItem {...props.modal} itemText="Profile" onClick={ShowProfile} />
            <OverflowMenuItem {...props.menuItem} itemText="Update Profile" />
            <OverflowMenuItem {...props.menuItem} itemText="Chat" onClick={chat} />
            <OverflowMenuItem {...props.menuItem} itemText="Change Profile" requireTitle />
            <OverflowMenuItem {...props.menuItem} itemText="Test API" onClick={TestAPI} />
            <OverflowMenuItem {...props.menuItem} itemText="User Cluster" onClick={GetCluster} />
            <OverflowMenuItem {...props.menuItem} hasDivider isDelete itemText="Delete Profile" />
           
          </OverflowMenu>

        </Header>
      </Content>
    </Container>


  );
}


