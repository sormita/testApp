import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Loading from "carbon-components-react/lib/components/Loading";
import { postLogin, getLogout, getUser, getRedirect } from "../api";
import "../css/carbon.css";



const SessionContext = createContext({
  active: false,
  user: undefined,
  error: undefined,
  pending: false,
  login: () => { },
  logout: () => { },
  Redirect: () => { }
});

const loadingStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

export function useSession() {
  return useContext(SessionContext);
}

export function SessionProvider({ children }) {
  const [active, setActive] = useState();
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (active == null) {
      getUser().then(handleLogin, handleLogout);
    }
  }, [active]);

  function handleLogin({ user = {} }) {
    setActive(true);
    setUser(user);
    setError();
  }

  function handleLogout() {
    setActive(false);
    setUser();
    setError();
  }

  function complete() {
    setPending(false);
  }

  function login(username, password) {
    setPending(true);
    return postLogin({ username, password })
      .then(handleLogin)
      .catch(err => {
        if (err.status === 401) {
          setError("Invalid username or password.");
        } else {
          setError("Sorry, something unexpected went wrong. Please try again later.");
          console.error(err);
        }
      })
      .then(complete);
  }

  function logout() {
    handleLogout();
    return getLogout()
      .then(() => { })
      .catch(console.error);
  }

  function userInfo() {
    
    return getUser()
      .then(() => { })
      .catch(console.error);

  }



  if (active == null) {
    return (
      <div style={loadingStyle}>
        <Loading withOverlay={false} description="Loading" />
      </div>
    );
  }

  return (
    <SessionContext.Provider value={{ active, user, error, pending, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

SessionProvider.propTypes = {
  children: PropTypes.any
};
