import React, { SyntheticEvent } from "react";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  card: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  }
};

type IState = { expanded: string };
type IProps = { classes: any };

const algos = [
  {
    title: "Sorting and Order Statistics",
    algorithms: [
      {
        title: "Heapsort"
      }
    ]
  },
  { title: "Data Structures" },
  { title: "Advanced Desgin and Analysis Techniques" },
  { title: "Advanced Data Structures" },
  { title: "Graph Algorithms" },
  { title: "Selected Topics" }
];

class Dashboard extends React.Component<IProps> {
  state: IState = { expanded: "" };

  constructor(props: IProps) {
    super(props);
  }

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
              <Typography className={classes.title}>{algo.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography className={classes.secondaryHeading}>
                {algo.algorithms && algo.algorithms.length
                  ? algo.algorithms.map(algorithm => {
                      return (
                        <Typography className={classes.secondaryHeading}>
                          {algorithm.title}
                        </Typography>
                      );
                    })
                  : "To be implemented"}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Dashboard);
