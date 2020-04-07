import React from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { FirebaseAppProvider } from "reactfire";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import VendorDashboard from "./pages/VendorDashboard";

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
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/:id" component={VendorDashboard} />
          </Switch>
        </Router>
      </Layout>
    </FirebaseAppProvider>
  );
};

export default App;
