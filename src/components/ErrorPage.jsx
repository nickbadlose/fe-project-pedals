import React from "react";

const ErrorPage = ({ err }) => {
  if (err === undefined) {
    return (
      <div>
        <h2>Oops!</h2>
        <h3>A bad request was sent.</h3>
        <p>Error Message: Invalid URL, Status Code: 404</p>
      </div>
    );
  }

  const { msg, status } = err;

  return (
    <div>
      <h2>Oops!</h2>
      {status === 400 && <h3>A bad request was sent.</h3>}
      {status === 404 && <h3>Nothing to see here.</h3>}
      <p>
        (Error Message: {msg}, Status Code: {status})
      </p>
    </div>
  );
};

export default ErrorPage;
