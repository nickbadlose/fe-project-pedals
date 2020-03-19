import React, { Component } from "react";
import LineChart from "react-linechart";
import axios from "axios";
import "../../node_modules/react-linechart/dist/styles.css";

const token =
  "pk.eyJ1IjoiY3ljbGluZ2lzZnVuIiwiYSI6ImNrN2Z6cWIzNjA3bnAzZnBlbzVseWkxYWYifQ.U9iDr2Ez6ryAqDlkDK7jeA";

export default class App extends Component {
  state = {
    data: [],
    isLoading: true,
    maxEle: 0,
    CEG: 0,
    height: 100,
    width: 200
  };

  render() {
    const { data, isLoading, maxEle, CEG, height, width } = this.state;
    const dataObj = [
      {
        color: "white",
        points: data
      }
    ];

    return (
      !isLoading && (
        <div>
          <b>
            Elevation (Max Ele {maxEle} · CEG {CEG})
          </b>
          <LineChart
            width={width}
            height={height}
            margins={{ top: 0, right: 50, bottom: 0, left: 0 }}
            hideXLabel={true}
            hideYLabel={true}
            hideXAxis={true}
            hideYAxis={true}
            hidePoints={true}
            // pointRadius={1}
            data={dataObj}
          />{" "}
        </div>
      )
    );
  }

  componentDidMount() {
    const { coordinates } = this.props;
    this.setState({ data: [] });

    coordinates.forEach(coordinate => {
      this.fetchElevation(coordinate);
    });
  }

  fetchElevation = coordinate => {
    const { coordinates } = this.props;
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

        this.setState(prevState => {
          const x = prevState.data.length + 1;
          const y = Math.max(...elevations);

          if (prevState.data.length + 1 === coordinates.length) {
            return {
              data: [...prevState.data, { x, y }],
              maxEle: y > prevState.maxEle ? y : prevState.maxEle,
              isLoading: false
            };
          } else {
            if (coordinates.indexOf(coordinate) === 0) {
              const height = 150;
              const width = 400;

              return {
                data: [...prevState.data, { x, y }],
                thisEle: y,
                maxEle: y,
                CEG: y,
                height,
                width
              };
            } else {
              return {
                data: [...prevState.data, { x, y }],
                thisEle: y,
                maxEle: y > prevState.maxEle ? y : prevState.maxEle,
                CEG: y > prevState.thisEle ? prevState.CEG + y : prevState.CEG
              };
            }
          }
        });
      });
  };
}
