import React, { useState, useEffect, Fragment } from 'react';
import { useWeb3Context } from 'web3-react';
import { Grid, Card, CardContent, Typography, Link } from '@material-ui/core';
import Loader from 'ui/components/Loader';

import Form from './form';

import metaMaskLogo from 'resources/img/metamask.png';

const App = props => {
  const [state, setState] = useState({
    connected: false,
    account: null,
    Web3: null,
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
      setState({
        ...state,
        connected: true,
        account,
        Web3: library,
      });
    }
  }, [active]);

  console.log('web3', Web3);
  console.log('account', account);
  console.log('web3Context', web3Context);

  const onSubmit = values => {
    console.log(values);

    // here where we submit the value in our smart contract function
  };

  // const validate = values => {
  //   const errors = {};
  //   if (!values.firstName) {
  //     errors.firstName = 'Required';
  //   }
  //   if (!values.lastName) {
  //     errors.lastName = 'Required';
  //   }
  //   return errors;
  // };

  if (typeof window.ethereum === 'undefined' || typeof window.web3 === 'undefined') {
    return (
      <Grid container justify="center" className="py-5">
        <Grid item xs={4} className="text-center">
          <Card>
            <div className="py-3">
              <img height="140" width="100" src={metaMaskLogo} alt="metamask" />
            </div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Please intall Metamask
              </Typography>
              <Typography component="p">
                You can install the{' '}
                <Link underline="hover" href="https://metamask.io/">
                  MetaMask
                </Link>{' '}
                add-on in Chrome, Firefox, Opera, and the new Brave browser.
              </Typography>
              <Typography component="p" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }

  if (!state.connected) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Grid container justify="center" className="py-5">
        <Grid item xs={4} className="text-center">
          <h1>Truffle Test Suite Tutorial</h1>
        </Grid>
        <Grid />
      </Grid>
      <Grid container justify="center" className="py-5">
        <Grid item xs={4} className="text-center">
          <Form onSubmit={onSubmit} />
        </Grid>
        <Grid />
      </Grid>
    </Fragment>
  );
};

export default App;
