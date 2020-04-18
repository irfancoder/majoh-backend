import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { FirebaseAppProvider } from "reactfire";
import { isUserLoggedIn } from "./utils";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import VendorDashboard from "./pages/VendorDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Firebase from "./firebase";

var firebaseConfig = {
  apiKey: "AIzaSyD0rkPJ6JfDKlHDaKhnzSogAJQk-0y47Mk",
  authDomain: "majoh-8eea2.firebaseapp.com",
  databaseURL: "https://majoh-8eea2.firebaseio.com",
  projectId: "majoh-8eea2",
  storageBucket: "majoh-8eea2.appspot.com",
  messagingSenderId: "692387040291",
  appId: "1:692387040291:web:5bcd181bd0b90b2970b596",
  measurementId: "G-5WDZDVKQQ2",
};

const App = () => {
  const [user, setUser] = useState(isUserLoggedIn());

  useEffect(() => {
    // console.log(user);
    if (user === null) {
      Firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          setUser(user);
        }
      });
    }
  });

  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          user ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
        }
      />
    );
  }

  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <PrivateRoute path="/dashboard" component={VendorDashboard} />
          </Switch>
        </Router>
      </Layout>
    </FirebaseAppProvider>
  );
};

export default App;
