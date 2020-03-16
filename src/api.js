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
      return data.routes;
    });
};

export const postRoute = (
  routeName,
  routeType,
  features,
  calculatedDistance,
  center,
  zoom,
  city,
  routeDescription
) => {
  return axios.post(
    `${baseURL}/routes`,
    {
      routeName,
      type: routeType,
      features,
      user_id: localStorage.username,
      calculatedDistance,
      center,
      zoom,
      routeDescription,
      city
    },
    {
      headers: { Authorization: "BEARER " + localStorage.token }
    }
  );
};

export const postLogIn = (username, password) => {
  return axios.post(`${baseURL}/login`, { username, password }).then(res => {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", username);
  });
};
