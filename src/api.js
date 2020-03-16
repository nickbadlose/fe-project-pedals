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

export const postLogIn = (username, password) => {
  return axios.post(`${baseURL}/login`, { username, password }).then(res => {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", username);
  });
};
