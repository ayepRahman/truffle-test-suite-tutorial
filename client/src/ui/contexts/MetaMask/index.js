import React, { createContext, useEffect } from 'react';
import Web3Provider from 'web3-react';
import { connectors } from 'utils/web3-connector';

export const MetaMaskContext = createContext();

export const MetaMaskProvider = props => {};

export const MetaMaskConsumber = MetaMaskContext.Consumer;
