import React, { ChangeEvent } from 'react';
import styled from 'styled-components/macro';
import { Paper, Divider, Typography, TextField, Button, Switch, FormControlLabel } from '@material-ui/core';
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
  };

  componentDidMount() {
    // this.drawChart();
  }

  drawChart() {
    const data = [12, 5, 7, 6, 6, 9, 10];
    const svg = d3
      .select('body')
      .append('svg')
      .attr('width', this.props.width)
      .attr('height', this.props.height);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 70)
      .attr('y', (d, i) => this.props.height - 10 * d)
      .attr('width', 65)
      .attr('height', (d, i) => d * 10)
      .attr('fill', 'green');
  }

  handleChange = (value: string) => (event: any): void => {
    this.setState({ [value]: event.target.value || event.target.checked });
  };

  addValue = () => {
    const { arrayInput, array } = this.state;
    this.setState({ array: [...array, arrayInput], arrayInput: '' });
  };

  renderArray = () => {
    const { array } = this.state;
    return array.map(element => <ArrayElement>{element}</ArrayElement>);
  };

  render() {
    // <div id={'#rect'} />
    const { arrayInput, array, visualize } = this.state;

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
        </Description>
      </Container>
    );
  }
}

export default Heapsort;
