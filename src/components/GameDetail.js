import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { smallImage } from "../util";
//IMAGES
import playstation from "../img/playstation.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import nintendo from "../img/nintendo.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";
//Star Images
import starEmpty from "../img/star-empty.png";
import starFull from "../img/star-full.png";
const GameDetail = ({ pathId }) => {
  const { game, screen, isLoading } = useSelector((state) => state.detail);
  const {
    name,
    rating,
    platforms = [],
    description_raw,
    background_image,
  } = game;
  const { results = [] } = screen;
  const navigate = useNavigate();

  const exitDetailHandler = (e) => {
    const element = e.target;
    if (element.classList.contains("shadow")) {
      document.body.style.overflow = "auto";
      // setIsOpen(false);
      navigate("/");
    }
  };
  //Get Stars
  const getStars = () => {
    const stars = [];
    const rating = Math.floor(game.rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img alt="star" key={i} src={starFull}></img>);
      } else {
        stars.push(<img alt="star" key={i} src={starEmpty}></img>);
      }
    }
    return stars;
  };
  //GET PLATFORM IMAGES
  const getPlatform = (platform) => {
    switch (platform) {
      case "PlayStation 4":
        return playstation;
      case "Xbox One":
        return xbox;
      case "PC":
        return steam;
      case "Nintendo Switch":
        return nintendo;
      case "iOS":
        return apple;
      default:
        return gamepad;
    }
  };
  return (
    <>
      {!isLoading && (
        <CardShadow className="shadow" onClick={exitDetailHandler}>
          <Detail
            animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
            initial={{ opacity: 0, x: -100, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, x: -100, transition: { duration: 0.5 } }}
            layoutId={pathId}
          >
            <Stats>
              <div className="rating">
                <h3>{name}</h3>
                <p>Rating: {rating}</p>
                {getStars()}
              </div>
              <Info>
                <h3>Platform</h3>
                <Platforms>
                  {platforms.map((data) => (
                    <img
                      alt={data.platform.name}
                      key={data.platform.id}
                      src={getPlatform(data.platform.name)}
                    ></img>
                  ))}
                </Platforms>
              </Info>
            </Stats>
            <Media>
              <motion.img
                layoutId={`image ${pathId}`}
                src={smallImage(background_image, 1280)}
                alt={background_image}
              />
            </Media>
            <Description>{description_raw}</Description>
            <div className="gallery">
              {results.map((screen) => (
                <img
                  src={smallImage(screen.image, 1280)}
                  key={screen.id}
                  alt={screen.image}
                />
              ))}
            </div>
          </Detail>
        </CardShadow>
      )}
    </>
  );
};

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;
const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  color: black;

  img {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    padding: 2rem 2rem;
  }
`;
const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }
  .rating {
    flex-grow: 1;
  }
  @media screen and (max-width: 930px) {
    /* flex-direction: column; */
    img {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;
const Info = styled(motion.div)`
  text-align: center;

  @media screen and (max-width: 768px) {
    flex-basis: 100%;
  }
`;
const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  img {
    margin-left: 3rem;
  }
  @media screen and (max-width: 786px) {
    img {
      margin-left: 1rem;
    }
  }
`;
const Media = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
  }
  @media screen and (max-width: 930px) {
    margin-top: 2rem;
  }
`;
const Description = styled(motion.div)`
  margin: 5rem 0rem;
  @media screen and (max-width: 786px) {
    margin: 2rem 0rem;
  }
`;
export default GameDetail;
