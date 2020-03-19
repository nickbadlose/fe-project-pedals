import axios from "axios";
const baseURL = "http://project-pedals.herokuapp.com/api/";

export const getRoutes = (type, sort_by, order) => {
  return axios
    .get(`${baseURL}/routes/`, {
      params: {
        type: type,
        sort_by: sort_by,
        order: order
      }
    })
    .then(({ data }) => {
      return data.routes;
    });
};

export const getRoutesByUser = username => {
  return axios
    .get(`${baseURL}/routes/`, {
      params: {
        user: username
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

export const getUser = username => {
  return axios.get(`${baseURL}/users/${username}`).then(({ data }) => {
    return data.user;
  });
};

export const postLogIn = (username, password) => {
  return axios.post(`${baseURL}/login`, { username, password }).then(res => {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", username);
  });
};

export const getReviews = route_id => {
  return axios
    .get(baseURL + "/reviews/" + route_id)
    .then(res => res.data.reviews);
};

export const postUser = (_id, password) => {
  return axios
    .post(`${baseURL}/users`, { _id, password })
    .then(({ data: { user } }) => {
      return user;
    });
};

export const getUsers = () => {
  return axios.get(`${baseURL}/users/`).then(({ data: { users } }) => {
    return users;
  });
};

export const getRouteCity = coordinates => {
  return axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=pk.eyJ1IjoiY2FpdGxpbi1iIiwiYSI6ImNrN2cwNGxqMzA3cTYzZW1wdGNmN3lrNHMifQ.cAnpnGVhEh0RQTtHeYDxUg
  `
    )
    .then(res => res.data.features[3].text);
};

export const saveRoute = (username, savedRoute) => {
  return axios
    .patch(`${baseURL}/users/${username}`, { savedRoute })
    .then(({ data: { user } }) => {
      return user;
    })
    .catch(err => {
      console.dir(err);
    });
};

export const postReview = (route_id, user_id, body, rating) => {
  return axios
    .post(
      `${baseURL}/reviews/${route_id}`,
      { user_id, body, rating },
      {
        headers: { Authorization: "BEARER " + localStorage.token }
      }
    )
    .then(({ data }) => data.review);
};

export const removeRoute = route_id => {
  return axios.delete(`${baseURL}/routes/${route_id}`);
};
