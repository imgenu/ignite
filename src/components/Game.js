import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Game = ({ game }) => {
  const { name, released, background_image } = game;
  return (
    <StyledGame>
      <h3>{name}</h3>
      <p>{released}</p>
      <img src={background_image} alt="popular game" />
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
  img {
    width: 100%;
    min-height: 40vh;
    object-fit: cover;
  }
`;
export default Game;
