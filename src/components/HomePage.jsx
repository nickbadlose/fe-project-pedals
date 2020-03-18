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
              Welcome to <span className={styles.pedals}>pedals!</span>
            </h3>
            <p className={styles.carousel_text}>
              Where you can map your route, <b>your way</b>.
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
          <Link to="/routes/family%20friendly">
            <Carousel.Caption className={styles.carousel_caption}>
              <h3 className={styles.carousel_title}>Family Friendly Rides</h3>
              <p className={styles.carousel_text}>
                Perfect for a family day out - rain or shine!
              </p>
            </Carousel.Caption>
          </Link>
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
          <Link to="/routes/off-road">
            <Carousel.Caption className={styles.carousel_caption}>
              <h3 className={styles.carousel_title}>Off-Road Rides</h3>
              <p className={styles.carousel_text}>
                For the adventurous or experienced rider, looking for a new
                challenge.
              </p>
            </Carousel.Caption>
          </Link>
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
          <Link to="/routes/training">
            <Carousel.Caption className={styles.carousel_caption}>
              <h3 className={styles.carousel_title}>Training Rides</h3>
              <p className={styles.carousel_text}>
                Find routes to test your fitness and endurance.
              </p>
            </Carousel.Caption>
          </Link>
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
          <Link to="/routes/scenic">
            <Carousel.Caption className={styles.carousel_caption}>
              <h3 className={styles.carousel_title}>Scenic Rides</h3>
              <p className={styles.carousel_text}>
                For those riders looking for a leisurely cycle, with the perfect
                scenery.
              </p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      </Carousel>
      <div className={styles.homePageInfo}>
        <div className={styles.introContainer}>
          <div className={styles.info}>
            <img src={pencil} alt={"pencil icon"} className={styles.icon}></img>
            <h3 className={styles.infoTitle}>Draw your path</h3>
            <p className={styles.p}>Map out your route on our 'Draw Page'...</p>
          </div>
          <div className={styles.info}>
            <img src={pin} alt={"pin icon"} className={styles.icon2}></img>
            <h3 className={styles.infoTitle}>Pin your points</h3>
            <p className={styles.p}>
              Add your recommendations or warnings - from the perfect café en
              route, to some pesky potholes you want to warn others of!
            </p>
          </div>
          <div className={styles.info}>
            <img
              src={paper_plane}
              alt={"paper plane icon"}
              className={styles.icon}></img>
            <h3 className={styles.infoTitle}>Share your way</h3>
            <p className={styles.p}>
              Share your expertise, and learn from others. Find the route that's
              perfect for you.
            </p>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Link to="/signup">
            <button className={styles.button}>Get started!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
