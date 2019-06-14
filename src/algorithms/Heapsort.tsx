import React, { ChangeEvent } from 'react';
import styled from 'styled-components/macro';
import { Paper, Divider, Typography, TextField, Button, Switch, FormControlLabel, Snackbar } from '@material-ui/core';
import { styled as styledMaterial } from '@material-ui/styles';
import * as d3 from 'd3';

const Title = styledMaterial(Typography)({
  fontWeight: 600,
  fontSize: '25px',
  margin: '20px',
});

const SubTitle = styledMaterial(Typography)({
  fontWeight: 600,
  fontSize: '20px',
  margin: '20px 0px 20px 0px',
  textAlign: 'left',
});

const Container = styledMaterial(Paper)({
  padding: '20px',
});

const Description = styledMaterial(Typography)({
  textAlign: 'left',
});

const ArrayElement = styledMaterial(Typography)({
  border: '1px solid black',
  padding: '10px',
});

const ArrayContainer = styled.div`
  display: flex;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row;
`;

interface IState {
  arrayInput: string;
  array: string[];
  visualize: boolean;
  error: string;
}
interface IProps {
  id: number;
  width: number;
  height: number;
}

class Heapsort extends React.Component<IProps> {
  state: IState = {
    arrayInput: '',
    array: [],
    visualize: false,
    error: '',
  };

  componentDidMount() {
    // this.drawChart();
  }

  handleChange = (value: string) => (event: any): void => {
    this.setState({ [value]: event.target.value || event.target.checked });
  };

  handleClose = (event: any): void => {
    this.setState({ error: '' });
  };

  addValue = () => {
    const { arrayInput, array } = this.state;
    if (arrayInput.trim()) {
      this.setState({ array: [...array, arrayInput], arrayInput: '' });
    } else {
      this.setState({ error: 'Enter a positive integer' });
    }
  };

  renderArray = () => {
    const { array } = this.state;
    return array.map(element => <ArrayElement>{element}</ArrayElement>);
  };

  renderHeap = (): any => {
    const data = [
      {
        name: 'root',
        parent: null,
        children: [
          {
            name: 'level 1 A',
            parent: 'root',
            children: [{ name: 'level 2 A', parent: 'level 1 A' }, { name: 'level 2 B', parent: 'level 1 A' }],
          },
          { name: 'level 1 B', parent: 'root' },
        ],
      },
    ];

    const { visualize } = this.state;

    // Clear previous state
    if (!visualize) {
      d3.select('svg').remove();
      return;
    }

    const tree = d3.tree().size([this.props.width, this.props.width]);

    const margin = { top: 20, right: 120, bottom: 20, left: 120 };
    const duration = 200;

    const diagonal = d3
      .linkVertical()
      .x(d => {
        return d[0];
      })
      .y(function(d) {
        return d[1];
      });

    const svg = d3
      .select('body')
      .append('svg')
      .attr('width', this.props.width)
      .attr('height', this.props.height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // FIXME: proper root object
    let root: any = data[0];
    root.x0 = this.props.height / 2;
    root.y0 = 0;

    this.update(root, tree, diagonal, svg, root, 0, duration);

    d3.select((window as any).frameElement)
      .style('height', '500px')
      .style('background-color', 'red');

    // svg
    //   .selectAll('rect')
    //   .data(data)
    //   .enter()
    //   .append('rect')
    //   .attr('x', (d, i) => i * 70)
    //   .attr('y', (d, i) => this.props.height - 10 * d)
    //   .attr('width', 65)
    //   .attr('height', (d, i) => d * 10)
    //   .attr('fill', 'green');

    return <div id={'#rect'} />;
  };

  update = (
    source: any,
    tree: d3.TreeLayout<{}>,
    diagonal: any,
    svg: any,
    root: any,
    i: number = 0,
    duration: number
  ) => {
    // Compute the new tree layout.
    let nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function(d: any) {
      d.y = d.depth * 180;
    });

    // Update the nodes…
    let node = svg.selectAll('g.node').data(nodes, function(d: any) {
      return d.id || (d.id = ++i);
    });

    // Enter any new nodes at the parent's previous position.
    let nodeEnter = node
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', function(d: any) {
        return 'translate(' + source.y0 + ',' + source.x0 + ')';
      })
      .on('click', () => {
        console.log('click');
      });

    nodeEnter
      .append('circle')
      .attr('r', 1e-6)
      .style('fill', function(d: any) {
        return d._children ? 'lightsteelblue' : '#fff';
      });

    nodeEnter
      .append('text')
      .attr('x', function(d: any) {
        return d.children || d._children ? -13 : 13;
      })
      .attr('dy', '.35em')
      .attr('text-anchor', function(d: any) {
        return d.children || d._children ? 'end' : 'start';
      })
      .text(function(d: any) {
        return d.name;
      })
      .style('fill-opacity', 1e-6);

    // Transition nodes to their new position.
    let nodeUpdate = node
      .transition()
      .duration(duration)
      .attr('transform', function(d: any) {
        return 'translate(' + d.y + ',' + d.x + ')';
      });

    nodeUpdate
      .select('circle')
      .attr('r', 10)
      .style('fill', function(d: any) {
        return d._children ? 'lightsteelblue' : '#fff';
      });

    nodeUpdate.select('text').style('fill-opacity', 1);

    // Transition exiting nodes to the parent's new position.
    let nodeExit = node
      .exit()
      .transition()
      .duration(duration)
      .attr('transform', function(d: any) {
        return 'translate(' + source.y + ',' + source.x + ')';
      })
      .remove();

    nodeExit.select('circle').attr('r', 1e-6);

    nodeExit.select('text').style('fill-opacity', 1e-6);

    // Update the links…
    let link = svg.selectAll('path.link').data(links, function(d: any) {
      return d.target.id;
    });

    // Enter any new links at the parent's previous position.
    link
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      .attr('d', function(d: any) {
        let o = { x: source.x0, y: source.y0 };
        return diagonal({ source: o, target: o });
      });

    // Transition links to their new position.
    link
      .transition()
      .duration(duration)
      .attr('d', diagonal);

    // Transition exiting nodes to the parent's new position.
    link
      .exit()
      .transition()
      .duration(duration)
      .attr('d', function(d: any) {
        let o = { x: source.x, y: source.y };
        return diagonal({ source: o, target: o });
      })
      .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d: any) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  };

  render() {
    // <div id={'#rect'} />
    const { arrayInput, array, visualize, error } = this.state;

    return (
      <Container>
        <Title>Heapsort</Title>
        <Divider />
        <Description>
          <SubTitle>Heaps</SubTitle>
          The <b>(binary) heap</b> data structure is an array object that we can view as a nearly complete binary tree.
          Each node of the tree corresponds to an element of the array. The tree is completely filled on all levels
          except possibly at the lowest, which is filled from the left up to a point.
          <br />
          <br />
          An array <i>A</i> that represents a heap is an object with two attributes: <i>A.length</i>, which gives the
          number of elements in the array, and <i>A.heap-size</i>, which represents how many elements in the heap are
          stored within array <i>A</i>
          <SubTitle>Visualizing the heap</SubTitle>
          <Row>
            <TextField
              id="array-input"
              label="New Value"
              value={arrayInput}
              onChange={this.handleChange('arrayInput')}
            />
            <Button onClick={this.addValue}>Add Value</Button>
          </Row>
          <br />
          <ArrayContainer>{this.renderArray()}</ArrayContainer>
          <FormControlLabel
            control={<Switch color="primary" checked={visualize} onChange={this.handleChange('visualize')} />}
            label="Visualize"
          />
          {this.renderHeap()}
        </Description>
        {error ? (
          <Snackbar
            open={Boolean(error)}
            autoHideDuration={2000}
            onClose={this.handleClose}
            message={<span id="error">{error}</span>}
            action={[
              <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                CLOSE
              </Button>,
            ]}
          />
        ) : null}
      </Container>
    );
  }
}

export default Heapsort;
