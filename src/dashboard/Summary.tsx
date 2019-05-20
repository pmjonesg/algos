import React from "react";
import { Typography } from "@material-ui/core";
import { Algorithm } from "models";

interface IProps {
  classes: any;
  algorithm: Algorithm;
}

const Summary: React.FC<IProps> = props => (
  <Typography className={props.classes.secondaryHeading}>
    {props.algorithm.title}
  </Typography>
);

export default Summary;
