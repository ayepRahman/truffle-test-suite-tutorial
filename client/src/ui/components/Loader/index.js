import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { MagicSpinner } from 'react-spinners-kit';

const Loader = ({ color }) => {
  return (
    <div style={{ height: '100vh' }}>
      <Grid container alignItems="center" justify="center" className="py-5 h-100">
        <Grid item className="text-center">
          <MagicSpinner color="gray" size={80} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Loader;
