import React, {useState,useEffect} from "react";
import { Redirect } from 'react-router-dom'
import LoadingOverlay from "react-loading-overlay";
//import { usePromiseTracker } from "react-promise-tracker";
import PropTypes from "prop-types";
import styled from "styled-components";
import Form from "carbon-components-react/lib/components/Form";
import TextArea from "carbon-components-react/lib/components/TextArea";
import Button from "carbon-components-react/lib/components/Button";
import Tag from "carbon-components-react/lib/components/Tag";
import FileUploader, { FileUploaderButton } from "carbon-components-react/lib/components/FileUploader";
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

import { getLog , postNLU } from "../../api";

import "../styles.css";

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

const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  ${props =>
    props.disappear &&
    `
      display: block; /* show */
    `}
`;

async function getActivityLog(username, logEvent) {
  console.log('getActivityLog calling');
  var user = storage.getItem("mock-api-user")
  //const result = await resolveCall();
  getLog(" User " + username + " " + logEvent);

}

async function getNLUAnalysis(selectedFile){
   var nluResult=postNLU(selectedFile);
  // storage.setItem("nluEntities",nluResult);
  
    console.log("Analysis Terms",analysis.terms);
}

// Return a promise which resolves after the specified interval
function getResult(selectedFile) {
  return new Promise(resolve => {
    var nluResult=postNLU(selectedFile);
  // storage.setItem("nluEntities",nluResult);
  
    console.log("Analysis Terms");
    for(var i = 0; i < nluResult.length; i++) {
      //terms[i] = nluResult[i].text;
      console.log("nlu terms inside promise:",nluResult[i].text);  
  }
  storage.setItem("nluEntities", JSON.stringify(nluResult));
    resolve(nluResult);
  });
}





// TODO: Ugly work around for session storage problem
const backingStorage = window.sessionStorage;

const storage = {
  getItem: key => {
    try {
      const value = backingStorage.getItem(key);
      return value != null ? JSON.parse(value) : undefined;
    } catch (err) {
      console.error(err);
    }
  },
  setItem: (key, value) => {
    try {
      backingStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(err);
    }
  },
  removeItem: key => {
    try {
      backingStorage.removeItem(key);
    } catch (err) {
      console.error(err);
    }
  }
};

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
  console.log("Submit Section");

  

  const [loaded, setLoaded] = useState(true); 
  const [show, setshow] = useState(false); 

  function useGetNLUResults() {
  
    //const [loaded, setLoaded] = useState(true); 
    useEffect(() => {
        // visible true -> false
        if (!loaded) {

          var nluResLoaded = storage.getItem("setNLU");
          console.log("nluResLoaded",nluResLoaded)
          if(!nluResLoaded){
            //setTimeout(() => setLoaded(true), 5000);
            console.log("I am here");
          }
          else{
          //      var nlu=JSON.parse(storage.getItem("nluEntities"));
               
          //   for(var i = 0; i < nlu.length; i++) {
          //     console.log(nlu[i]);
          //     analysis.terms[i]=nlu[i];
  
          // }
               
            setTimeout(() => setLoaded(true), 250); 
          }
                  
          
        }
    }); 
  
    return loaded;
  }

  analysis.fileName = storage.getItem("fileName");

  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  
  const isNLUResultLoaded = useGetNLUResults();
    console.log("NLU Result loaded",isNLUResultLoaded);


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
    //var upldFile=storage.getItem("actualFile");
    console.log("uploaded file",selectedFile);
    var nluResult= getResult(selectedFile);

    nluResult.then(
      function(nluResult){
        analysis.fileName = storage.getItem("fileName");

        analysis.fileSize = storage.getItem("fileSize");
      
        var nlu=JSON.parse(storage.getItem("nluEntities"));
               
        for(var i = 0; i < nlu.length; i++) {
          
          analysis.terms[i]=nlu[i];

      }

      storage.setItem("nluEntities", JSON.stringify(nlu));
    
        getActivityLog(storage.getItem("mock.api.user").name, " uploaded a file for review");        
    
        window.location.href = ("/claims");
      }
    )
    
    
  }

  return (

    <Section as={Form} onSubmit={handleSubmit}>
      <SectionHeading>Submit Claim for Payment</SectionHeading>
      <Column1>
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
      <button onClick={() => setLoaded(!loaded)}>Start Loading</button>
            <DarkBackground disappear={!loaded}>
        {/* <Loader
          loaded={false}
          lines={13}
          length={20}
          width={10}
          radius={30}
          corners={1}
          rotate={0}
          direction={1}
          color="#a5d8ff"
          speed={1}
          trail={60}
          shadow={false}
          hwaccel={false}
          className="spinner"
          zIndex={2e9}
          top="50%"
          left="50%"
          scale={1.0}
          loadedClassName="loadedContent"
        />*/}
        <LoadingOverlay
          active={true}
          // spinner={<BounceLoader />}
          spinner={true}
          text="Loading your content..."
        >
          
        </LoadingOverlay>
      </DarkBackground>
      </Column1>      
    </Section>

  );
}



function AnalysisSection({ analysis }) {
  if (analysis == null) {
    return false;
  }
    
  
  var renderFlag = storage.getItem("fileName");
  analysis.requestor = storage.getItem("mock.api.user").name;
     

  function handleSubmitPayment(event) {
    event.preventDefault();
    console.log("handleSubmitPayment");

    getActivityLog(storage.getItem("mock.api.user").name, " submitted for Payment processng");
    window.location.href = ("/success");



  }

  //Show the date on the page
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var submittedDate = JSON.stringify(mm + '/' + dd + '/' + yyyy).replace(/\"/g, "");
  analysis.bank = '711-30-2222';
  analysis.fileName = storage.getItem("fileName");
  var nlu=JSON.parse(storage.getItem("nluEntities"));
               
        for(var i = 0; i < nlu.length; i++) {
          console.log(nlu[i]);
          analysis.terms[i]=nlu[i];

      }
  
    return (

      <Section as={Form} onSubmit={handleSubmitPayment}>
        <SectionHeading>Completed Claim Processing Section</SectionHeading>
  
        <Body>This document is payment request.</Body>
        {renderFlag &&
          <Body>File name is {analysis.fileName}</Body>}
        {renderFlag &&
          <Body>
            It was submitted to {analysis.department} on {submittedDate}.
          </Body>}
        {renderFlag &&
          <Body>
            Requestor: {analysis.requestor}
            <br />
            Bank Route: {analysis.bank}
            <br />
            Amount: {analysis.amount}
          </Body>}
        {renderFlag &&
          <SubHeading>(Simulated Watson) Relevant terms extracted</SubHeading>}
        {renderFlag &&
          <TagContainer>
            {analysis.terms.map(term => (
              <Tag key={term} type="cool-gray">
                {term}
              </Tag>
            ))}
          </TagContainer>}
  
        <Button type="submit" >
          Approve Payment
        </Button>
  
      </Section>
    );
  

  
}

AnalysisSection.propTypes = {
  analysis: PropTypes.object
};

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
          <div>
          <AnalysisSection analysis={analysis}  /> 
          </div>
                     
          </Column2>
          {/* <div style={{ background: "blue" }}>&nbsp;</div> */}
        </PageContainer>
      </div>
    </>
  );
}