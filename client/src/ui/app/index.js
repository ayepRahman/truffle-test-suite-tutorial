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
  const { setConnector, account, active } = web3Context;
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
      const name = response[0];
      const age = new Web3.utils.BN(response[1]).toNumber(); // converting uint BN to number - toNumber() come from web3.

      const user = {
        name: name,
        age: age,
      };

      setUser(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSubmit = async values => {
    const { name, age } = values;
    const convertedAge = Number(age);

    try {
      await contract.setUser(name, convertedAge, { from: account });
      const response = await contract.getUser();
      const newName = response[0];
      const newAge = new Web3.utils.BN(response[1]).toNumber();

      const user = {
        name: newName,
        age: newAge,
      };

      setUser(user);
    } catch (error) {
      console.log(error);
    }
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

  console.log('User', user);

  return (
    <Fragment>
      <Grid container justify="center" className="pt-5 pb-3">
        <Grid item xs={4} className="text-center">
          <h1>Truffle Test Suite Tutorial</h1>
          {user && (
            <div className="pt-3">
              {user.name && <h3>Name - {user.name}</h3>}
              {user.age && <h3>Age - {user.age}</h3>}
            </div>
          )}
        </Grid>
        <Grid />
      </Grid>
      <Grid container justify="center">
        <Grid item xs={4} className="text-center">
          <Form onSubmit={values => onSubmit(values)} />
        </Grid>
        <Grid />
      </Grid>
    </Fragment>
  );
};

export default App;
