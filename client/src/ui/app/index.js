import React, { useState, useEffect, Fragment } from 'react';
import { useWeb3Context } from 'web3-react';
import { Grid, Card, CardContent, Typography, Link } from '@material-ui/core';
import Loader from 'ui/components/Loader';

import Form from './form';

import UsersContract from 'contracts/Users.json';
import truffleContract from 'truffle-contract';

import metaMaskLogo from 'resources/img/metamask.png';
import { getContractAddress } from 'ethers/utils';

const App = props => {
  const [state, setState] = useState({
    account: null,
    Web3: null,
    contract: null,
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
        account,
        Web3: library,
      });

      getContract();
    }
  }, [active, Web3]);

  const getContract = async () => {
    const contract = truffleContract(UsersContract);
    contract.setProvider(Web3.currentProvider);

    try {
      const contractInstance = await contract.deployed();
      console.log(contractInstance);
      console.log('STATE -  getContract', state);

      // setState({
      //   ...state,
      //   contract: contractInstance,
      // });
    } catch (error) {
      console.log(error.message);
    }
  };

  // console.log('web3', Web3);
  // console.log('account', account);
  // console.log('web3Context', web3Context);

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

  if (!active) {
    return <Loader />;
  }

  console.log('ACTIVE', active);
  console.log('STATE -  AFTER ACTIVE', state);

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
          {/* <Form onSubmit={onSubmit} /> */}
        </Grid>
        <Grid />
      </Grid>
    </Fragment>
  );
};

export default App;
