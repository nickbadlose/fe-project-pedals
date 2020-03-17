export const checkUserExists = (users, username) => {
  return users.every(user => user._id !== username);
};
