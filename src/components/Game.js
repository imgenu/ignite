import React, { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import loadDetail from "../actions/detailAction";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { smallImage } from "../util";
import { popup } from "../animation";
const Game = ({ game }) => {
  const { name, released, background_image, id } = game;
  const stringPathId = id.toString();
  const dispatch = useDispatch();

  const loadDetailHandler = () => {
    document.body.style.overflow = "hidden";
    dispatch(loadDetail(game.id));
  };
  return (
    <StyledGame
      variants={popup}
      animate="show"
      initial="hidden"
      className="123"
      layoutId={stringPathId}
      onClick={loadDetailHandler}
    >
      <Link to={`/game/${game.id}`}>
        <h3>{name}</h3>
        <p>{released}</p>
        <motion.img
          layoutId={`image ${stringPathId}`}
          src={smallImage(background_image, 640)}
          alt="popular game"
        />
      </Link>
    </StyledGame>
  );
};
const StyledGame = styled(motion.div)`
  /* flex: 1 1 300px;
  margin: 2rem 1rem; */
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;
  /* visibility: visible !important; */
  h3 {
    height: 5rem;
  }
  img {
    width: 100%;
    min-height: 40vh;
    object-fit: cover;
  }
`;
export default Game;
