import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import { logoutUser, setCurrentUser } from "./actions/authAction";
import setAuthToken from "./utils/setAuthToken";

import PrivateRoute from "./components/common/PrivateRoute";

import store from "./store";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AddStudent from "./components/student/AddStudent";
import Dashboard from "./components/Dashboard";
import Students from "./components/student/Students";
import EditStudent from "./components/student/EditStudent";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

// Check for token
if (localStorage.jhpiToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jhpiToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jhpiToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
  }
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/student" component={Students} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/student/edit/:id"
                component={EditStudent}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/add-student" component={AddStudent} />
            </Switch>

            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Register} />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
