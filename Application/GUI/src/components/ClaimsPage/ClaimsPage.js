import React, {useState, useEffect} from "react";
import { Redirect } from 'react-router-dom'

import styled from "styled-components";
import Form from "carbon-components-react/lib/components/Form";
import TextArea from "carbon-components-react/lib/components/TextArea";
import Button from "carbon-components-react/lib/components/Button";

import FileUploader, { FileUploaderButton } from "carbon-components-react/lib/components/FileUploader";
import { useStateMachine } from 'little-state-machine';
import * as Loader from "react-loader-spinner";
import AnalysisSection from "./components/AnalysisSection";
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
import {
  array,
  withKnobs,
  boolean,
  number,
  select,
  text,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { settings } from 'carbon-components';
import { addons, mockChannel } from '@storybook/addons';
import { VolumeDownFilledAlt20 } from "@carbon/icons-react";
import { Grid, Row } from "carbon-components-react/lib/components/Grid";
import {setLoading} from '../../state'
import { getLog , postNLU } from "../../api";
import {getActivityLog} from './helpers'
import {storage} from './utils'

addons.setChannel(mockChannel());

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


const Body = styled.p`
  margin: ${spacing03} 0;
`;


const buttonKinds = {
  'Primary (primary)': 'primary',
  'Secondary (secondary)': 'secondary',
  'Danger (danger)': 'danger',
  'Ghost (ghost)': 'ghost',
  'Danger Primary (danger--primary)': 'danger--primary',
  'Tertiary (tertiary)': 'tertiary',
};

const sizes = {
  'Compat check - Field': 'field',
  'Compat check - Small': 'small',
  'Compat check - default': 'default',
  'Small  (sm)': 'sm',
  'Medium (md)': 'md',
  'Large (lg) - Default': 'lg',
};
const Button1 = styled(Button)`
  size: select('Button size (size)', sizes, 'default'),
`;
const RowDetail = styled(Row)`
  
  border: 5px outset #ffffff;
  background: #ffffff;
  height: 5rem;
  align-items: center;
  margin: 1rem;
`;


// TODO: Ugly work around for session storage problem



var analysis = {
  fileName: "sample",
  fileSize: "100",
  requestor: "Dan",
  bank: "62977",
  amount: "$5317.00",
  date: "2021-11-04",
  time: "4:23pm",
  department: "Claims Processing",
  terms: ["term1", "term2", "term3", "another term", "term 4", "term 5", "term 6", "my last term"]
}; 



function SubmitSection() {


   const {state,actions} = useStateMachine({
    setLoading,
  }) 

   useEffect (()=>{
    console.log("state--",state);
    actions.setLoading(true)
  },[]) 

  console.log("Submit Section");
  analysis.fileName = storage.getItem("fileName");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  async function getNLUAnalysis(selectedFile){
  var nluResult=await postNLU(selectedFile);
  storage.setItem("nluEntities",nluResult);
  actions.setLoading(false);
    console.log("Analysis Terms",analysis.terms);
}

  const handleFileSelect = (event) =>{
    console.log("handleFileSelect");
    var files = event.target.files; // FileList object
    storage.setItem("fileName", files[0].name);
    storage.setItem("fileSize", files[0].size);
    
    // Update the state
    setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);

    console.log("file in handleFileSelect: ",event.target.files[0]);
    //postNLU(files[0]);    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit");

    var files = event.target.files; // FileList object
    
    getNLUAnalysis(selectedFile);
    
    analysis.fileName = storage.getItem("fileName");

    analysis.fileSize = storage.getItem("fileSize");
  

    getActivityLog(storage.getItem("mock.api.user").name, " uploaded a file for review");
    //window.location.href = ("/claims");



  }

  return (

    <Section as={Form} onSubmit={handleSubmit}>
      <SectionHeading>Submit Claim for Payment</SectionHeading>
      <RowDetail>
        <p>
          1. Upload Document </p><p>
          2. Submit for Payment </p><p>
          3. (approver will ) Approve Payment </p>
      </RowDetail>
      <div className={`${prefix}--file__container`}>
        <FileUploader {...props.fileUploader()} onChange={handleFileSelect} />
      </div>
      <Button type="submit" >Submit for Payment</Button>
    </Section>

  );
}



<Body>This document is payment request.</Body>




/*****File Uploader */
const { prefix } = settings;


const filenameStatuses = {
  'Edit (edit)': 'edit',
  'Complete (complete)': 'complete',
  'Uploading (uploading)': 'uploading',
};
const props = {

  fileUploaderButton: () => {
    const buttonKind = select('Button kind (buttonKind)', buttonKinds, '');
    return {
      className: 'bob',
      labelText: text('Label text (labelText)', 'Upload files'),
      name: text('Form item name: (name)', ''),
      multiple: boolean('Supports multiple files (multiple)', true),
      disabled: boolean('Disabled (disabled)', false),
      buttonKind: buttonKind || 'primary',
      size: select('Button size (size)', sizes, 'default'),
      disableLabelChanges: boolean(
        'Prevent the label from being replaced with file selected file (disableLabelChanges)',
        false
      ),
      role: text('ARIA role of the button (role)', 'button'),
      tabIndex: number('Tab index (tabIndex)', 0),
      onChange: action('onChange'),
    };
  },
  fileUploader: () => {
    const buttonKind = select(
      'Button kind (buttonKind)',
      {
        'Primary (primary)': 'primary',
        'Tertiary (tertiary)': 'tertiary',
      },
      ''
    );
    return {
      labelTitle: text(''),
      labelDescription: text(
        'The label description (labelDescription)',
        ''
      ),
      buttonLabel: text('The button label (buttonLabel)', 'Upload Files'),
      buttonKind: buttonKind || 'primary',
      size: select('Button size (size)', sizes, 'default'),
      filenameStatus: select(
        'Status for file name (filenameStatus)',
        filenameStatuses,
        'edit'
      ),
      accept: array('Accepted file extensions (accept)', ['.txt', '.pdf'], ','),
      name: text('Form item name: (name)', ''),
      multiple: boolean('Supports multiple files (multiple)', true),
      iconDescription: text(
        'Close button icon description (iconDescription)',
        'Clear file'
      ),
      onChange: action('onChange'),
      onClick: action('onClick'),
      onDelete: action('onDelete'),
    };
  },
  fileUploaderItem: () => ({
    name: text('Filename (name)', 'some.txt'),
    status: select('Status for file name (status)', filenameStatuses, 'edit'),
    iconDescription: text(
      'Close button icon description (iconDescription)',
      'Clear file'
    ),
    onDelete: action('onDelete'),
    invalid: boolean('Invalid (invalid)', false),
    errorSubject: text(
      'Error subject (errorSubject)',
      'File size exceeds limit'
    ),
    errorBody: text(
      'Error body (errorBody)',
      '500kb max file size. Select a new file and try again.'
    ),
    size: select('FileUploaderItem height (size)', sizes, 'default'),
  }),

};


export default function ClaimsPage() {
  console.log("Claims page top level");
  const {state} = useStateMachine();
  console.log("state",state);
  var nlu=JSON.parse(storage.getItem("nluEntities"));

  
  console.log("state",setLoading)

  for(var i = 0; i < nlu.length; i++) {
    console.log(nlu[i]);
    analysis.terms[i]=nlu[i];
      
}
  
  
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onChange = (event, newValue) => {
    console.log("Claims page onChange");
  }

  return (
    <>
      <CustomPage background={theme.uiBackground} />
      <div>
        <AppBanner />
        <NavBar />
        <PageContainer>
          <Column1>
            <SubmitSection />
          </Column1>
          <Column2>
        
          <AnalysisSection analysis={analysis} />
          </Column2>
          {/* <div style={{ background: "blue" }}>&nbsp;</div> */}
        </PageContainer>
      </div>
    </>
  );
}