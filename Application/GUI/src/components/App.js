import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSession } from "./session";
import LoginPage from "./LoginPage";
import RequestPage from "./RequestPage";
import SuccessPage from "./SuccessPage";
import AccountPage from "./AccountPage";
import ClaimsPage from "./ClaimsPage";
import ReferencePage from "./ReferencePage";
import FormsPage from "./FormsPage";

// TODO Barry this controls the handoffs to other pages - if a new page is needed, the route goes here

const loginSwitch = (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <Route render={() => <Redirect to="/login" />} />
  </Switch>
);

const defaultSwitch = (
  <Switch>
    <Route exact path="/request" component={RequestPage} />
    <Route exact path="/success" component={SuccessPage} />
    <Route exact path="/account" component={AccountPage} />
    <Route exact path="/claims" component={ClaimsPage} />
    <Route exact path="/reference" component={ReferencePage} />
    <Route exact path="/forms" component={FormsPage} />
    <Route exact path="/" render={() => <Redirect to="/account" />} />
    <Route render={() => <Redirect to="/" />} />
  </Switch>
);

function App() {
  const { active } = useSession();
  return <BrowserRouter>{active ? defaultSwitch : loginSwitch}</BrowserRouter>;
}

export default App;
