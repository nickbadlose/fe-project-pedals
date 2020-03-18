import React, { Component } from "react";
import LineChart from "react-linechart";
import axios from "axios";
import "../../node_modules/react-linechart/dist/styles.css";

const token =
  "pk.eyJ1IjoiY3ljbGluZ2lzZnVuIiwiYSI6ImNrN2Z6cWIzNjA3bnAzZnBlbzVseWkxYWYifQ.U9iDr2Ez6ryAqDlkDK7jeA";

export default class App extends Component {
  state = { data: [], isLoading: true };
  testCo = [
    [-2.243437194562347, 53.47937156671131],
    [-2.245279265879219, 53.48020470020762],
    [-2.244689803058094, 53.481037817344],
    [-2.2421109032150355, 53.48081857757853],
    [-2.242184586067509, 53.480380094648496]
  ];
  render() {
    return (
      this.state.isLoading && (
        <div>
          <LineChart width={200} height={200} data={this.state.data} />
        </div>
      )
    );
  }

  componentDidMount() {
    //const { coordinates } = this.props;
    const coordinates = this.testCo;

    coordinates.forEach(coordinate => {
      this.fetchElevation(coordinate);
    });
  }

  fetchElevation = coordinate => {
    //const { coordinates } = this.props;
    const coordinates = this.testCo;
    const lng = coordinate[0];
    const lat = coordinate[1];

    axios
      .get(
        `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${lng},${lat}.json?layers=contour&limit=50&access_token=${token}`
      )
      .then(({ data: { features } }) => {
        const elevations = [];

        features.forEach(feature => {
          const { ele } = feature.properties;
          elevations.push(ele);
        });

        const x = coordinates.indexOf(coordinate) + 1;
        const y = Math.max(...elevations);

        this.setState(prevState => {
          if (prevState.data.length + 1 === coordinates.length) {
            return {
              data: [...prevState.data, { x, y }],
              isLoading: false
            };
          } else {
            return {
              data: [...prevState.data, { x, y }],
              isLoading: true
            };
          }
        });
      });
  };
}
