import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Algorithm } from 'models';

const styles = (theme: any) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

interface IProps {
  classes: any;
  algorithm: Algorithm;
}

const Summary: React.FC<IProps> = props => (
  <Link to={props.algorithm ? props.algorithm.url : '/'}>
    <Paper style={{ width: '100vw' }} className={props.classes.root} elevation={1}>
      <Typography>{props.algorithm ? props.algorithm.title : 'Collapsed view'}</Typography>
    </Paper>
  </Link>
);

export default withStyles(styles)(Summary);
