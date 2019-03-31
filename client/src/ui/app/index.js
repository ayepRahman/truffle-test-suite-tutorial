import React, { useState, useEffect, Fragment } from 'react';
import { useWeb3Context } from 'web3-react';
import { Grid, Card, CardContent, Typography, Link } from '@material-ui/core';
import Loader from 'ui/components/Loader';

import Form from './form';

import UsersContract from 'contracts/Users.json';
import truffleContract from 'truffle-contract';

import metaMaskLogo from 'resources/img/metamask.png';

const App = props => {
  const web3Context = useWeb3Context();
  const [contract, setContract] = useState();
  const [user, setUser] = useState();
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
      getContract();
    }
  }, [active]);

  const getContract = async () => {
    const contract = truffleContract(UsersContract);
    contract.setProvider(Web3.currentProvider);

    try {
      const contractInstance = await contract.deployed();
      setContract(contractInstance);

      const response = await contractInstance.getUser();

      console.log('response', response);
      const age = Web3.utils.BN(response[1]);

      const user = {
        name: response[0],
        age: age,
      };

      setUser(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  // console.log('web3', Web3);
  // console.log('account', account);
  // console.log('web3Context', web3Context);

  const onSubmit = async values => {
    console.log('ONSUBMIT', values);
    const { name, age } = values;
    const newAge = Number(age);

    try {
      await contract.setUser(name, newAge, { from: account });
      const response = await contract.getUser();

      console.log(response[0], response[1]);

      console.log('USER - on submit response', response);
    } catch (error) {
      console.log(error);
    }

    // here where we submit the value in our smart contract function
  };

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

  // console.log('ACTIVE', active);
  // console.log('CONTRACT', contract);
  console.log('User', user);

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
          <Form onSubmit={values => onSubmit(values)} />
        </Grid>
        <Grid />
      </Grid>
    </Fragment>
  );
};

export default App;
