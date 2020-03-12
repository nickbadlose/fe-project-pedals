import React, { Component } from "react";
import RouteCard from "./RouteCard";
import CardDeck from "react-bootstrap/CardDeck";
import styles from "./styling/RouteCard.module.css";

class AllRoutes extends Component {
  state = {
    routes: [
      {
        routeName: "Jess' Route",
        route_id: 1,
        user_id: "jessjelly",
        calculatedDistance: 6,
        center: [2, 4],
        zoom: [10],
        type: "scenic",
        city: "liverpool",
        averageRating: 4,
        features: [
          {
            id: "939f91b44e6e9e02d291936b38d37d41",
            type: "LineString",
            properties: {},
            geometry: {
              coordinates: [
                [-2.243437194562347, 53.47937156671131],
                [-2.245279265879219, 53.48020470020762],
                [-2.244689803058094, 53.481037817344],
                [-2.2421109032150355, 53.48081857757853],
                [-2.242184586067509, 53.480380094648496],
                [-2.2416688060989145, 53.48011700271519]
              ]
            }
          },
          {
            id: "d62ef1b6b3e5aea6bdc449c5fa083087",
            type: "Feature",
            properties: {},
            geometry: {
              coordinates: [-2.245278926116555, 53.48020142417977],
              type: "Point"
            }
          },
          {
            id: "5758f5346eceea68c082b427b8f34d83",
            type: "Feature",
            properties: {},
            geometry: {
              coordinates: [-2.2448123582680353, 53.4810583735227],
              type: "Point"
            }
          }
        ]
      },
      {
        routeName: "Jess' second Route",
        route_id: 2,
        user_id: "jessjelly",
        calculatedDistance: 2,
        center: [2, 4],
        zoom: [10],
        type: "family friendly",
        city: "manchester",
        averageRating: 2,
        features: [
          {
            id: "939f91b44e6e9e02d291936b38d37d41",
            type: "LineString",
            properties: {},
            geometry: {
              coordinates: [
                [-2.243437194562347, 53.47937156671131],
                [-2.245279265879219, 53.48020470020762],
                [-2.244689803058094, 53.481037817344],
                [-2.2421109032150355, 53.48081857757853],
                [-2.242184586067509, 53.480380094648496],
                [-2.2416688060989145, 53.48011700271519]
              ]
            }
          },
          {
            id: "d62ef1b6b3e5aea6bdc449c5fa083087",
            type: "Feature",
            properties: {},
            geometry: {
              coordinates: [-2.245278926116555, 53.48020142417977],
              type: "Point"
            }
          },
          {
            id: "5758f5346eceea68c082b427b8f34d83",
            type: "Feature",
            properties: {},
            geometry: {
              coordinates: [-2.2448123582680353, 53.4810583735227],
              type: "Point"
            }
          }
        ]
      },
      {
        routeName: "Steph's Route",
        route_id: 3,
        user_id: "steph",
        calculatedDistance: 25,
        center: [2, 4],
        zoom: [10],
        type: "scenic",
        city: "chester",
        averageRating: 5,
        features: [
          {
            id: "939f91b44e6e9e02d291936b38d37d41",
            type: "LineString",
            properties: {},
            geometry: {
              coordinates: [
                [-2.243437194562347, 53.47937156671131],
                [-2.245279265879219, 53.48020470020762],
                [-2.244689803058094, 53.481037817344],
                [-2.2421109032150355, 53.48081857757853],
                [-2.242184586067509, 53.480380094648496],
                [-2.2416688060989145, 53.48011700271519]
              ]
            }
          },
          {
            id: "d62ef1b6b3e5aea6bdc449c5fa083087",
            type: "Feature",
            properties: {},
            geometry: {
              coordinates: [-2.245278926116555, 53.48020142417977],
              type: "Point"
            }
          },
          {
            id: "5758f5346eceea68c082b427b8f34d83",
            type: "Feature",
            properties: {},
            geometry: {
              coordinates: [-2.2448123582680353, 53.4810583735227],
              type: "Point"
            }
          }
        ]
      },
      {
        routeName: "Annas' Route",
        route_id: 4,
        user_id: "anna",
        calculatedDistance: 14,
        center: [2, 4],
        zoom: [10],
        type: "scenic",
        city: "stoke",
        averageRating: 2,
        features: [
          {
            id: "939f91b44e6e9e02d291936b38d37d41",
            type: "LineString",
            properties: {},
            geometry: {
              coordinates: [
                [-2.243437194562347, 53.47937156671131],
                [-2.245279265879219, 53.48020470020762],
                [-2.244689803058094, 53.481037817344],
                [-2.2421109032150355, 53.48081857757853],
                [-2.242184586067509, 53.480380094648496],
                [-2.2416688060989145, 53.48011700271519]
              ]
            }
          },
          {
            id: "d62ef1b6b3e5aea6bdc449c5fa083087",
            type: "Feature",
            properties: {},
            geometry: {
              coordinates: [-2.245278926116555, 53.48020142417977],
              type: "Point"
            }
          },
          {
            id: "5758f5346eceea68c082b427b8f34d83",
            type: "Feature",
            properties: {},
            geometry: {
              coordinates: [-2.2448123582680353, 53.4810583735227],
              type: "Point"
            }
          }
        ]
      }
    ]
  };

  render() {
    const { routes } = this.state;
    return (
      <div>
        <h2>All routes</h2>
        <h3>Filter section</h3>
        <CardDeck className={styles.routeCard_block}>
          {routes.map(route => {
            return <RouteCard key={route.route_id} route={route} />;
          })}
        </CardDeck>
      </div>
    );
  }
}

export default AllRoutes;
