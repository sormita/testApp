import {
    spacing03,
    spacing05,
    spacing06,
    spacing07,
    layout02,
  } from "@carbon/layout";
  import styled from "styled-components";
  import PropTypes from "prop-types";
  import Button from "carbon-components-react/lib/components/Button";
  import Form from "carbon-components-react/lib/components/Form";
  import Tag from "carbon-components-react/lib/components/Tag";

  import {getActivityLog} from '../helpers'
  import {storage} from '../utils'
 

  

  const Section = styled.div`
  padding: ${layout02} 0;
`;

const SectionHeading = styled.h3`
  margin-bottom: ${spacing05};
`;


const Body = styled.p`
  margin: ${spacing03} 0;
`;

const TagContainer = styled.div`
  margin-bottom: ${spacing06};
`;

const SubHeading = styled.h4`
  margin: ${spacing07} 0 ${spacing05} 0;
`;

createStore({
  analysisTerms: ["term1", "term2", "term3", "another term", "term 4", "term 5", "term 6", "my last term"]
});

function updatedAnalysisTerms(state, payload) {
  return {
    ...state,
    yourDetail: {
      ...state.yourDetail,
      ...payload,
    },
  };
}


const AnalysisSection=({ analysis })=> {
  
    if (analysis == null) {
      return false;
    }

    const {state} = useStateMachine({ updatedAnalysisTerms });
  console.log("state",state);
  var nlu=JSON.parse(storage.getItem("nluEntities"));

  
  console.log("state",setLoading)

  for(var i = 0; i < nlu.length; i++) {
    console.log(nlu[i]);
    analysis.terms[i]=nlu[i];
      
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
    analysis.fileName = storage.getItem("fileName")
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
             <div onClick={() => actions.updateName({ name: 'bill' })}>
             {state.yourDetail.name}
             </div>
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
  
  export default AnalysisSection;