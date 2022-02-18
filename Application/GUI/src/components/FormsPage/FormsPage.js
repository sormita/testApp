import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Form from "carbon-components-react/lib/components/Form";
import TextArea from "carbon-components-react/lib/components/TextArea";
import Button from "carbon-components-react/lib/components/Button";
import Tag from "carbon-components-react/lib/components/Tag";
import { settings } from 'carbon-components';
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
import InfoBar from "./InfoBar";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { action } from '@storybook/addon-actions';
//for watson
import ScriptTag from 'react-script-tag';
import {
  array,
  withKnobs,
  boolean,
  number,
  select,
  text,
} from '@storybook/addon-knobs';
import {
  Tile,
  ClickableTile,
  SelectableTile,
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from "carbon-components-react/lib/components/Tile";
import { Grid, Row, Column } from "carbon-components-react/lib/components/Grid";
import { makeStyles } from '@material-ui/core/styles';


const breakpoint = breakpoints.md.width;


const Spacer = styled.div`
  flex: 1 0 ${spacing06};
`;

const PageContainer = styled(PageMargin)`
  display: flex;
  flex-direction: column;
  @media (min-width: ${breakpoint}) {
    flex-direction: Row;
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
 display: flexbox;
 flexDirection: row;
 border: 5px outset black;
 padding: ${layout02} 0; 
`;
const SubSection = styled.div`
  padding: ${layout02} 0;
`;

const SectionHeading = styled.h3`
  margin-bottom: ${spacing05};
`;

const SubHeading = styled.h4`
  margin: ${spacing07} 0 ${spacing05} 0;
`;
const SubContent = styled.div`
  display: flex;
  margin: 0 2 vw;
  color: #000000;
  align-items: left;
  @media (min-width: 40 rem) {
    margin: 0 auto;
    max-width: 500rem;
  }
`;

const InputContainer = styled.div`
  margin-bottom: ${spacing06};
`;

const Body = styled.p`
  margin: ${spacing03} 0;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  flex: 1 0 auto;
  padding: ${layout01};
  @media (min-width: 50rem) {
    flex-direction: Row;
  }
`;
const RowDetail = styled(Row)`
  display: fixed;

  border: 5px outset #ffffff;
  background: #ffffff;
  height: 5rem;
  width: 50vw;
  align-items: center;
  margin: 1rem;
`;
const Button1 = styled(Button)`
height: 2vw;
width: 10vw;
`;

const TagContainer = styled.div`
  margin-bottom: ${spacing06};
`;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

/*****File Uploader */
const { prefix } = settings;
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
      labelText: text('Label text (labelText)', 'Add files'),
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
      labelTitle: text('The label title (labelTitle)', 'Upload files'),
      labelDescription: text(
        'The label description (labelDescription)',
        'Max file size is 500mb. Browse your file system to upload a document.'
      ),
      buttonLabel: text('The button label (buttonLabel)', 'Add file'),
      buttonKind: buttonKind || 'primary',
      size: select('Button size (size)', sizes, 'default'),
      filenameStatus: select(
        'Status for file name (filenameStatus)',
        filenameStatuses,
        'edit'
      ),
      accept: array('Accepted file extensions (accept)', ['.pdf', '.txt'], ','),
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
    name: text('Filename (name)', 'README.md'),
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
  fileUploaderDropContainer: () => ({
    size: select('Filename height (size)', sizes, 'default'),
    labelText: text(
      'Label text (labelText)',
      'Drag and drop files here or click to upload'
    ),
    name: text('Form item name (name)', ''),
    multiple: boolean('Supports multiple files (multiple)', true),
    accept: array(
      'Accepted MIME types or file extensions (accept)',
      ['text/plain', 'application/pdf'],
      ','
    ),
    disabled: boolean('Disabled (disabled)', false),
    role: text('ARIA role of the button (role)', ''),
    tabIndex: number('Tab index (tabIndex)', 0),
    onChange: action('onChange'),
  }),
};



const useStyles = makeStyles((theme) => ({
  root: {
    flexRow: 1,
    backgroundColor: theme.palette.background.paper,

  },
}));

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
      <SectionHeading>Forms</SectionHeading>
      <Body>Placeholder for Forms Page</Body>
    </Section>
  );
}

SuccessSection.propTypes = {
  resultobj: PropTypes.object
};

const resultobj = {
  success: "Forms"
};



function HealthSection() {

  return (
    <FormContainer>

      <Column1>

        <Row><SubHeading>Beneficiaries </SubHeading></Row>

        <Row><RowDetail><div>John - Father</div></RowDetail></Row>
        <Row><RowDetail><div>Baby </div></RowDetail></Row>
        <Row><RowDetail><div>Add Beneficiary</div></RowDetail></Row>

      </Column1>

      <Column2>

        <Row><SubHeading>Upload</SubHeading></Row><Row><SubContent>Upload your document or an image of your document to automatically
          fill in your beneficiary information.</SubContent></Row>
       <Row><div className={`${prefix}--file__container`}>
            <FileUploader {...props.fileUploader()} />
          </div> </Row>
        
      

      </Column2>
    </FormContainer>
  );
}
function LifeSection({ analysis }) {
  if (analysis == null) {
    return false;
  }
  return (
    <FormContainer>
      <Column1>

        <Row><SubHeading>Life Insurance</SubHeading></Row>
        <Row> {analysis.date} at {analysis.time}.</Row>
        <Row> Requestor: {analysis.requestor}</Row>
        <Row>Relevant terms extracted</Row>
        <Row><TagContainer>
          {analysis.terms.map(term => (
            <Tag key={term} type="cool-gray">
              {term}
            </Tag>
          ))}
        </TagContainer>  </Row>
        <Row><Button type="submit" > Process request</Button></Row>
      </Column1>
      <Column2>
        <Row><SubHeading>Additional Info</SubHeading></Row>
        <Row>This would contain additional information on Life Insurance Products</Row>
        <Row>Other information would list here</Row>
        <Row>Press Process button to update</Row>

      </Column2>

    </FormContainer>
  );
}
LifeSection.propTypes = {
  analysis: PropTypes.object
};
const analysis = {
  requestor: "Bob Smith",
  sn: "62977",
  rank: "Master Corporal",
  date: "2019-04-04",
  time: "4:23pm",
  department: "Department of National Defense",
  terms: ["term1", "term2", "term3", "term 4", "my last term"]
};
export default function FormsPage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  //UGLY WORK AROUND FOR WASTSON ASSISTANT
  const refreshPage = () => {
    window.location.reload();
  }
  return (
    <>
      <CustomPage background={theme.uiBackground} />
      <div>
        <AppBanner />
        <NavBar />
        <InfoBar />
        <AppBar position="static" color="#ffffff">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Health" {...a11yProps(0)} />
            <Tab label="Life" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Column1>
            <HealthSection />
          </Column1>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Column2>
            <LifeSection analysis={analysis} />
          </Column2>
        </TabPanel>
        <ScriptTag type="text/javascript" src="./watson.js" />
      </div>
    </>
  );
}
