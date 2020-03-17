import React from "react";
import Carousel from "react-bootstrap/Carousel";
import styles from "./styling/HomePage.module.css";
import pencil from "./icons/pencil.png";
import pin from "./icons/pin.png";
import paper_plane from "./icons/paper_plane.png";
import { Link } from "@reach/router";

const HomePage = () => {
  return (
    <div>
      <Carousel className={styles.carousel_container}>
        <Carousel.Item className={styles.carousel_item}>
          <img
            // className="d-block w-100"
            className={styles.photo}
            src={
              "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
            }
            //add height and width
            // height="auto"
            // width="auto"
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
            // className="d-block w-100"
            className={styles.photo}
            src={
              "https://images.unsplash.com/photo-1468781840274-cbaa1abd0f12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80"
            }
            // height="500px"
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
            // className="d-block w-100"
            className={styles.photo}
            src={
              "https://images.unsplash.com/photo-1516611187196-8686751913bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"
            }
            alt="off road slide"
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
            // className="d-block w-100"
            className={styles.photo}
            src={
              "https://images.unsplash.com/photo-1571188654248-7a89213915f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            }
            // height="500px"
            alt="training slide"
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
            // className="d-block w-100"
            className={styles.photo}
            src={
              "https://images.unsplash.com/photo-1564432176891-6e2ac6d6bcd6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMjF9&auto=format&fit=crop&w=1267&q=80"
            }
            // height="500px"
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
      <div className={styles.homePageInfo}>
        <div className={styles.introContainer}>
          <div className={styles.info}>
            <img src={pencil} alt={"pencil icon"} className={styles.icon}></img>
            <h3 className={styles.infoTitle}>Draw your path</h3>
            <p className={styles.p}>Map out your route on our 'Draw Page'</p>
          </div>
          <div className={styles.info}>
            <img src={pin} alt={"pin icon"} className={styles.icon2}></img>
            <h3 className={styles.infoTitle}>Pin your points</h3>
            <p className={styles.p}>Add your recommendations or warnings</p>
          </div>
          <div className={styles.info}>
            <img
              src={paper_plane}
              alt={"paper plane icon"}
              className={styles.icon}
            ></img>
            <h3 className={styles.infoTitle}>Share your way</h3>
            <p className={styles.p}>
              Share your expertise, and learn from others! Find the route that's
              perfect for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
