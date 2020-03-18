export const checkUserExists = (users, username) => {
  return users.every(user => user._id !== username);
};

export const checkRouteIsSaved = (user, route_id) => {
  return user.savedRoutes.every(route => {
    return route._id !== route_id;
  });
};
