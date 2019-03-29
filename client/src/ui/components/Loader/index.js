import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Loader from 'react-loader-spinner';

const Loading = ({ type }) => {
  return (
    <Grid
      container
      style={{ height: '100vh' }}
      alignItems="center"
      justify="center"
      className="py-5 h-100"
    >
      <Grid item className="text-center">
        <Loader type={type} color="#06C0A5" height="100" width="100" />
      </Grid>
    </Grid>
  );
};

Loading.propTypes = {
  type: PropTypes.string,
};

Loading.defaultProps = {
  type: 'TailSpin',
};

export default Loading;
