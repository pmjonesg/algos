import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

const styles = createStyles({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

type IProps = {
  classes: any;
};

const NavigationBar: React.FC<IProps> = props => {
  return (
    <div className={props.classes.root}>
      <AppBar position="static">
        <ToolBar>
          <Typography
            variant="h6"
            color="inherit"
            className={props.classes.grow}
          >
            Algos
          </Typography>
        </ToolBar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(NavigationBar);
