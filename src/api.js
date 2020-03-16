import axios from "axios";
const baseURL = "http://project-pedals.herokuapp.com/api/";

export const getRoutes = user_id => {
  return axios
    .get(`${baseURL}/routes/`, {
      params: {
        user_id: user_id
      }
    })
    .then(({ data }) => {
      // console.log(data.routes, "in get routes!");
      return data.routes;
    });
};



export const postRoute = (routeName, routeType, features, calculatedDistance, center, zoom, city, routeDescription) => {

  return axios.post(`${baseURL}/routes`, {routeName, type: routeType, features, user_id: localStorage.username, calculatedDistance, center, zoom, routeDescription, city}, {
    headers: { Authorization: 'BEARER ' + localStorage.token }
  })
}