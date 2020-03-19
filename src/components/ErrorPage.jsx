import React from "react";
import styles from "./styling/ErrorPage.module.css";
import sadcloud from "./icons/sadcloud.png";
import nothingfound from "./icons/nothingfound.png";

const ErrorPage = ({ err }) => {
  if (err === undefined) {
    return (
      <div className={styles.errorPage}>
        <h2 className={styles.h2}>Oops!</h2>
        <h3 className={styles.h3}>A bad request was sent.</h3>
        <img src={nothingfound} alt={"nothing found"}></img>
        <p className={styles.p}>Error Message: Invalid URL, Status Code: 404</p>
      </div>
    );
  }

  const { msg, status } = err;

  return (
    <div className={styles.errorPage}>
      <h2 className={styles.h2}>Oops!</h2>
      {status === 400 && (
        <div>
          <h3 className={styles.h3}>A bad request was sent.</h3>
          <img src={sadcloud} alt={"sad cloud"}></img>
        </div>
      )}
      {status === 404 && (
        <div>
          <h3 className={styles.h3}>Nothing to see here.</h3>
          <img src={nothingfound} alt={"sad cloud"}></img>
        </div>
      )}
      <p className={styles.p}>
        (Error Message: {msg}, Status Code: {status})
      </p>
    </div>
  );
};

export default ErrorPage;
