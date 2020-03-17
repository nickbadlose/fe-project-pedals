import React from "react";
import Carousel from "react-bootstrap/Carousel";
import welcome_image from "./icons/welcome_image.jpg";
import family_friendly_img from "./icons/family_friendly_img.jpg";
import off_road_img from "./icons/off_road_img.jpg";
import training_img from "./icons/training_img.jpg";
import scenic from "./icons/scenic.jpg";
import styles from "./styling/HomePage.module.css";

const HomePage = () => {
  return (
    <div>
      <Carousel className={styles.carousel_container}>
        <Carousel.Item className={styles.carousel_item}>
          <img
            className="d-block w-100"
            src={welcome_image}
            //add height and width
            // height="500px"
            alt="welcome slide"
          />
          <Carousel.Caption className={styles.carousel_caption}>
            <h3 className={styles.carousel_title}>
              Welcome to <b className={styles.pedals}>pedals!</b>
            </h3>
            <p className={styles.carousel_text}>
              Where you can map your route - your way.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={family_friendly_img}
            height="500px"
            alt="family friendly slide"
          />
          <Carousel.Caption className={styles.carousel_caption}>
            <h3 className={styles.carousel_title}>Family Friendly Rides</h3>
            <p className={styles.carousel_text}>
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={off_road_img}
            alt="scenic slide"
          />
          <Carousel.Caption className={styles.carousel_caption}>
            <h3 className={styles.carousel_title}>Off-Road Rides</h3>
            <p className={styles.carousel_text}>
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={"https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80"}
            height="500px"
            alt="scenic slide"
          />
          <Carousel.Caption className={styles.carousel_caption}>
            <h3 className={styles.carousel_title}>Training Rides</h3>
            <p className={styles.carousel_text}>
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={scenic}
            height="500px"
            alt="scenic slide"
          />
          <Carousel.Caption className={styles.carousel_caption}>
            <h3 className={styles.carousel_title}>Scenic Rides</h3>
            <p className={styles.carousel_text}>
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <p>Home page</p>
    </div>
  );
};

export default HomePage;
