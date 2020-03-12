import React from "react";
import Carousel from "react-bootstrap/Carousel";
import welcome_image from "./icons/welcome_image.jpg";
import family_friendly_img from './icons/family_friendly_img.jpg'
import off_road_img from './icons/off_road_img.jpg'
import training_img from './icons/training_img.jpg'
import scenic from './icons/scenic.jpg'

import styles from './HomePage.module.css'

const HomePage = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={welcome_image}
            height="500px"
            alt="welcome slide"
          />
          <Carousel.Caption className={styles.carousel_caption}>
            <h3 className={styles.carousel_title}>Welcome to Pedals</h3>
            <p className={styles.carousel_text}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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
            <p className={styles.carousel_text}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={off_road_img}
            height="500px"
            alt="scenic slide"
          />
          <Carousel.Caption className={styles.carousel_caption}>
            <h3 className={styles.carousel_title}>Off-Road Rides</h3>
            <p className={styles.carousel_text}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={training_img}
            height="500px"
            alt="scenic slide"
          />
          <Carousel.Caption className={styles.carousel_caption}>
            <h3 className={styles.carousel_title}>Training Rides</h3>
            <p className={styles.carousel_text}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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
            <p className={styles.carousel_text}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <p>Home page</p>
    </div>
  );
};

export default HomePage;
