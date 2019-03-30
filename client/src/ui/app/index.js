import React, { useState, useEffect } from 'react';
import { useWeb3Context } from 'web3-react';
import { Grid } from '@material-ui/core';
import Loader from 'ui/components/Loader';

const App = props => {
  const [state, setState] = useState({
    connected: false,
    account: null,
  });
  const web3Context = useWeb3Context();
  const { setConnector, library, account, active } = web3Context;
  const Web3 = web3Context && web3Context.library;

  useEffect(() => {
    const web3Library = web3Context.connectorName === 'metaMask' && web3Context.library;

    if (!web3Library) {
      setConnector('metaMask');
    }
  }, []);

  useEffect(() => {
    if (active) {
      Web3.eth.defaultAccount = Web3.eth.accounts[0];
      setState({
        ...state,
        connected: true,
      });
    }
  }, [active]);

  console.log('web3', Web3);
  console.log('account', account);
  // console.log(account);
  // console.log('account', Web3.eth.defaultAccount);

  if (!state.connected) {
    return <Loader />;
  }

  return (
    <Grid container justify="center" className="py-5">
      <Grid item xs={4} className="text-center">
        <h1>Truffle Test Suite Tutorial</h1>
      </Grid>
    </Grid>
  );
};

export default App;
