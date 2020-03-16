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
