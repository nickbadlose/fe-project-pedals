import axios from "axios";
const baseURL = "http://project-pedals.herokuapp.com/api/";

export const getRoutes = (type, user_id, sort_by, order) => {
  return axios
    .get(`${baseURL}/routes/`, {
      params: {
        type: type,
        user_id: user_id,
        sort_by: sort_by,
        order: order
      }
    })
    .then(({ data }) => {
      //console.log(data.routes, "in get routes!");
      return data.routes;
    });
};


export const getUser = username => {
  return axios.get(`${baseURL}/users/${username}`).then(({ data }) => {
    return data.user;
  });
};

export const postRoute = (routeName, routeType, features, calculatedDistance, center, zoom, city, routeDescription) => {

  return axios.post(`${baseURL}/routes`, {routeName, type: routeType, features, user_id: localStorage.username, calculatedDistance, center, zoom, routeDescription, city}, {
    headers: { Authorization: 'BEARER ' + localStorage.token }
  })
}

export const postLogIn = (username, password) => {
  return axios.post(`${baseURL}/login`, { username, password }).then(res => {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", username);
  });
};

export const getRouteCity = (coordinates) => {
  return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=pk.eyJ1IjoiY2FpdGxpbi1iIiwiYSI6ImNrN2cwNGxqMzA3cTYzZW1wdGNmN3lrNHMifQ.cAnpnGVhEh0RQTtHeYDxUg
  `).then(res =>  res.data.features[3].text)
}

