import React, {useState} from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import DisputeRequest from './pages/DisputeRequest';
import DisputeSend from './pages/DisputeSend';
import Intro from './pages/Intro';
import JudgeScreen from './pages/JudgeScreen';
import { Web3ReactProvider } from '@web3-react/core'
import {ethers} from 'ethers';
import DisclosureProof from './pages/DisclosureProof';

function getLibrary(provider: any) {
  return new ethers.providers.Web3Provider(provider) // this will vary according to whether you use e.g. ethers or web3.js
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <HashRouter basename="/">
        <Switch>
          <Route
            path="/"
            exact
            component={Intro}
          />
          <Route path="/dispute-send" exact component={DisputeSend} />
          <Route path="/dispute-request" exact component={DisputeRequest} />
          <Route path="/disclosure" exact component={DisclosureProof} />
          <Route
            path="/judge"
            exact
            component={JudgeScreen}
          />
        </Switch>
    </HashRouter>
  </Web3ReactProvider>
  );
}

export default App;
