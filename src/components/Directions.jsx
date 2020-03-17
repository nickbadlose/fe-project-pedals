import React, { Component } from "react";
import { distance } from "@turf/turf";
import isequal from "lodash.isequal";
import axios from "axios";
import styles from "./styling/Directions.module.css";

const token =
  "pk.eyJ1IjoiY3ljbGluZ2lzZnVuIiwiYSI6ImNrN2Z6cWIzNjA3bnAzZnBlbzVseWkxYWYifQ.U9iDr2Ez6ryAqDlkDK7jeA";

class Directions extends Component {
  state = {
    directions: [],
    currentLocation: [],
    userLocated: false,
    directionsLoaded: false
  };

  render() {
    const { directions } = this.state;

    return (
      <div>
        <p>Directions</p>
        <ul className={styles.directionsList}>
          {directions.map(direction => {
            return (
              <li key={directions.indexOf(direction)}>
                {direction.instruction}, continue for {`[${direction.for}]`}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    this.directions();
    this.location();
  }

  componentDidUpdate(prevProps, prevState) {
    const { userLocated, directionsLoaded, currentLocation } = this.state;
    const check = isequal(currentLocation, prevState.currentLocation);

    if (check && userLocated && directionsLoaded) {
      this.enRoute();
    }
  }

  enRoute = () => {
    const { directions, currentLocation } = this.state;
    const routeCoordinates = [];

    directions.forEach(direction => {
      routeCoordinates.push(direction.coordinates);
    });

    routeCoordinates.forEach(coordinate => {
      const distanceTo = distance(currentLocation, coordinate, {
        units: "meters"
      });
      const index = routeCoordinates.indexOf(coordinate);

      if (distanceTo < 30) {
        const updatedDirections = directions.slice(index + 1);

        this.setState({ directions: updatedDirections });
      }
    });
  };

  directions = () => {
    const { coordinates } = this.props;
    const route = this.createRoute(coordinates);

    axios
      .get(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/${route}?steps=true&access_token=${token}`
      )
      .then(res => {
        let steps = [];
        const directions = [];

        res.data.routes[0].legs.forEach(leg => {
          leg.steps.forEach(section => {
            steps.push(section);
          });
        });

        steps.forEach(step => {
          const { location, instruction } = step.maneuver;
          const currentIndex = steps.indexOf(step);
          const nextStep = steps[currentIndex + 1];

          directions.push({
            coordinates: location,
            instruction: instruction,
            for: nextStep
              ? `${distance(location, nextStep.maneuver.location, {
                  units: "meters"
                }).toFixed(0)} meters`
              : 0
          });
        });

        this.setState({ directions, directionsLoaded: true });
      });
  };

  location = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const success = position => {
      const { coords } = position;
      const currentCo = [coords.longitude, coords.latitude];

      this.setState({ currentLocation: currentCo, userLocated: true });
    };

    const error = err => {
      console.log(err);
    };

    navigator.geolocation.watchPosition(success, error, options);
  };

  createRoute = coordinates => {
    let route = ``;

    coordinates.map(coordinate => {
      const index = coordinates.indexOf(coordinate);
      if (index === coordinates.length - 1) {
         route += `${coordinate}`;
      } else  route += `${coordinate};`;
    });
    return route;
  };
}

export default Directions;
