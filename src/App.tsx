import React, {useState} from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import DisputeRequest from './pages/DisputeRequest';
import DisputeSend from './pages/DisputeSend';
import Intro from './pages/Intro';
import JudgeScreen from './pages/JudgeScreen';


function App() {

  return (
    <HashRouter basename="/">
      <Switch>
        <Route
          path="/"
          exact
          component={Intro}
        />
        <Route path="/dispute-send" exact component={DisputeSend} />
        <Route path="/dispute-request" exact component={DisputeRequest} />
        <Route
          path="/judge"
          exact
          component={JudgeScreen}
        />
      </Switch>
  </HashRouter>
  );
}

export default App;
