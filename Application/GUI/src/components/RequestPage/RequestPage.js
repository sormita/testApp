import React from "react";
import { Redirect } from 'react-router-dom'
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
  spacing07,
  spacing08
} from "@carbon/layout";
import { theme, CustomPage, PageMargin, AppBanner } from "../common";
import NavBar from "./NavBar";
import ScriptTag from 'react-script-tag';
import { makeStyles } from '@material-ui/core/styles';
import {
  Tile,
  ClickableTile,
  SelectableTile,
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from "carbon-components-react/lib/components/Tile";
import { TextItalic16 } from "@carbon/icons-react";
import { useSession } from "../session";



const breakpoint = breakpoints.md.width;

const PageContainer = styled(PageMargin)`
  display: flex;
  flex-direction: column;
  @media (min-width: ${breakpoint}) {
    flex-direction: row;
  }
`;

const Section = styled.div`
  border: 5px outset purple; 
  padding: ${layout02} 0;
`;

const SectionHeading = styled.h3`
  margin-bottom: ${spacing05};
`;

const SubHeading = styled.h4`
  border: 5px outset red; 
  margin: ${spacing07} 0 ${spacing05} 0;
`;

const InputContainer = styled.div`
  margin-bottom: ${spacing06};
`;

const Body = styled.p`
  margin: ${spacing03} 0;
`;

const FeatureContainer = styled.div`
  margin: ${spacing07} 0 ${spacing05} 0;
  margin-bottom: ${spacing06};
  @media (max-width: 1rem) {
    flex-direction: column;
  }
`;
const TagContainer = styled.div`
  margin-bottom: ${spacing06};
`;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));
const Spacer = styled.div`
  flex: 1 0 ${spacing06};
`;

const ProductContainer = styled.div`
background-color: #ffffff;
border: 24px solid #ffffff;
text-align: left;
margin-top: ${spacing06};
margin-bottom: ${spacing06};
`;
const ProductContent = styled.div`

border: 3px outset #f2f2f2;
text-align: left;
`;

const Recommended = styled.div`
  background-color: #a4ce4e
  text-align: center;
`;
const NotRecommended = styled.div`
  
  text-align: center;
`;
const RecommendArea = styled.div`
  text-align: center;
`;
const ProductFiller = styled.div`
  background-color: #ffffff;
  text-align: center;
  margin-bottom: ${spacing08};
 
`;
const DebugDiv = styled.div`
  border: 5px outset black;
  background-color: lightblue;
  text-align: center;
`;


function Product(choice) {
  // choice is 0 or 1 : 1 indicates to show the banner
  var json = JSON.stringify(choice);

  var mychoice;
  try {
    mychoice = JSON.parse(json);

  } catch (err) {

  }

  console.log("Product mychoice" + mychoice);
  console.log("Product mychoice.choice" + mychoice.choice);

  if (mychoice.choice != 1) {

    return (
      <NotRecommended><Spacer>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</Spacer><Spacer> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </Spacer></NotRecommended>

    );
  } else {
    return (
      <div>
        <Recommended>We recommend this plan for you</Recommended>
        <Recommended>Why this plan?</Recommended>
      </div>
    );
  }
}


function AnalysisSection({ analysis }) {
  console.log('TEST RUN ABOUT TO CALL');

  var mychoice = analysis.chosen;
  console.log('mychoice ' + mychoice);

  /*if (mychoice == "1") {
    console.log("CHOICE IS 1");
  }*/

  if (analysis == null) {
    return false;
  }

  try {
    var myjas = JSON.parse(JSON.stringify(analysis));
  } catch (err) {
    console.log('json error ' + err);
  }
  console.log("ANalysis section " + myjas.chosen);

  return (

    <ProductContent>

      <form action="/success" method="GET">
        <h1 style={{ color: '#007abc' , fontWeight: 'bold' }}><center>{analysis.coverage}</center> </h1>

        <div><center>{analysis.description}</center></div>

        <h2><center>
          {analysis.cost}
        </center>
        </h2>

        <FeatureContainer>
          {analysis.terms.map(term => (

            <li>

              {term}

            </li>
          ))}
        </FeatureContainer>
        <div align="center">
          <Button type="submit"  >
            Choose Plan
          </Button>
        </div>
      </form>

    </ProductContent>

  );
}

AnalysisSection.propTypes = {
  analysis: PropTypes.object
};

const analysis1 = {
  chosen: "0",
  emergency: "1",
  ms: "1",
  description: "Best for people who want to try our products",
  cost: "$55/month",
  door: "1",
  date: "2019-04-04",
  time: "4:23pm",
  coverage: "silver",
  terms: ["Emergency Button    ", "Motion Sensor    ", "Designate 1 emergency contact", "", "", "", ""]
};
const analysis2 = {
  chosen: "1",
  emergency: "1",
  ms: "1",
  description: "Provides coverage for the most important areas of your home",
  cost: "$65/month",
  door: "1",
  date: "2019-04-04",
  time: "4:23pm",
  coverage: "gold",
  terms: ["Emergency Button    ", "Motion Sensor    ", "Designate up 2 emergency contacts", "2 Door Sensors", "Personal Wellness Concierge", "", ""]
};
const analysis3 = {
  chosen: "0",
  emergency: "1",
  ms: "1",
  description: "Best for those looking for complete house monitoring",
  cost: "$85/month",
  door: "1",
  date: "2019-04-04",
  time: "4:23pm",
  coverage: "platinum",
  terms: ["Emergency Button    ", "Motion Sensor    ", "Designate up to 5 emergency contact", "2 Door Sensors", "Personal Wellness Concierge", "24/7 Emergency Line", "Professional in-home installation"]
};
const analysis4 = {
  chosen: "0",
  emergency: "1",
  ms: "1",
  description: "Best for those who need custom service",
  cost: "Custom",
  door: "1",
  date: "2019-04-04",
  time: "4:23pm",
  coverage: "custom",
  terms: ["Choose from all of our monitoring options", "", "", "", "", ""]
};

export default function RequestPage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const backingStorage = window.sessionStorage;
  const userKey = "mock.api.user";
  const user = JSON.parse(backingStorage.getItem(userKey));
  let apiChosen = new Array(4);
  apiChosen[user.cluster] = 1;
  /*this.callApi()
    .then(res => this.setState({ response: res.express }))
    .catch(err => console.log(err));
  const callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("CALL API " + JSON.stringify(body));
    return body;
  };*/


  return (
    <>
      <CustomPage background={theme.uiBackground} />
      <div>
        <AppBanner />
        <NavBar />
        <PageContainer>
          <ProductContainer >
            <RecommendArea><Product choice={apiChosen[0]}></Product></RecommendArea>
            <AnalysisSection analysis={analysis1} />
          </ProductContainer >
          <ProductContainer >
            <RecommendArea><Product choice={apiChosen[1]}></Product></RecommendArea>
            <AnalysisSection analysis={analysis2} />
          </ProductContainer >
          <ProductContainer >
            <RecommendArea><Product choice={apiChosen[2]}></Product></RecommendArea>
            <AnalysisSection analysis={analysis3} />
          </ProductContainer >

          <ProductContainer >
            <RecommendArea><Product choice={apiChosen[3]}></Product></RecommendArea>
            <AnalysisSection analysis={analysis4} />
          </ProductContainer >
          {/* <div style={{ background: "blue" }}>&nbsp;</div> */}
        </PageContainer>
        <ScriptTag type="text/javascript" src="./watson.js" />
      </div>
    </>
  );
}
