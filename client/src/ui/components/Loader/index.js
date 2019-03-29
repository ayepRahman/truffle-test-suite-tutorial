import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import LoaderSpinner from 'react-loader-spinner';

const Loader = ({ type }) => {
  return (
    <div style={{ height: '100vh' }}>
      <Grid container alignItems="center" justify="center" className="py-5 h-100">
        <Grid item className="text-center">
          <LoaderSpinner type={type} color="#06C0A5" height="100" width="100" />
        </Grid>
      </Grid>
    </div>
  );
};

Loader.propTypes = {
  type: PropTypes.string,
};

Loader.defaultProps = {
  type: 'TailSpin',
};

export default Loader;
