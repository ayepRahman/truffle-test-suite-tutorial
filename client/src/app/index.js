import React, { useState, useEffect } from 'react';
import { useWeb3Context } from 'web3-react';
import { Container, Row, Col } from 'react-bootstrap';
import Loader from 'react-loader-spinner';

const App = props => {
  const [state, setState] = useState({
    connected: false,
    account: null,
  });
  const web3Context = useWeb3Context();
  const { setConnector, library, account, active } = web3Context;
  const Web3 = web3Context && web3Context.library;

  useEffect(() => {
    const web3Library = web3Context.connectorName === 'ganache' && web3Context.library;

    if (!web3Library) {
      setConnector('ganache');
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
    return (
      <Container className="py-5">
        <Row className="justify-content-center text-center">
          <Col xs sm={4}>
            <Loader type="Puff" color="#00BFFF" height="100" width="100" />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center text-center">
        <Col xs sm={4}>
          <h1>Truffle Test Suite Tutorial</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
