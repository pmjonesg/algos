import React from "react";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";

import Summary from "./Summary";

// Models
import { Algorithm } from "models";

const styles = {
  card: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  }
};

interface IState {
  expanded: string;
}
interface IProps {
  classes: any;
}

interface AlgorithmItem {
  title: string;
  algorithms?: Algorithm[];
}

const algos: AlgorithmItem[] = [
  {
    title: "Sorting and Order Statistics",
    algorithms: [
      {
        id: 0,
        title: "Heapsort"
      }
    ]
  },
  { title: "Data Structures" },
  { title: "Advanced Design and Analysis Techniques" },
  { title: "Advanced Data Structures" },
  { title: "Graph Algorithms" },
  { title: "Selected Topics" }
];

class Dashboard extends React.Component<IProps> {
  state: IState = { expanded: "" };

  handleChange = (panel: string) => (event: any, expanded: any) => {
    this.setState({
      expanded: expanded ? panel : ""
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <React.Fragment>
        {algos.map(algo => (
          <ExpansionPanel
            expanded={expanded === algo.title}
            onChange={this.handleChange(algo.title)}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5" gutterBottom={true}>
                {algo.title}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {algo.algorithms && algo.algorithms.length
                ? algo.algorithms.map(algorithm => (
                    <Summary
                      key={algorithm.id}
                      classes={classes}
                      algorithm={algorithm}
                    />
                  ))
                : "To be implemented"}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Dashboard);
