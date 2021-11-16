import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { motion } from "framer-motion";
import { loadGames } from "../actions/gamesAction";
import Game from "../components/Game";
function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);
  //const games = useSelector((state) => state.games); // 此處的game是rootReducer取得的
  const { popular, newGames, upcoming } = useSelector((state) => state.games);

  console.log(popular);
  return (
    <GameList>
      <h2>Popular Games</h2>
      <Games>
        {popular.map((game) => (
          <Game game={game} key={game.id} id={game.id} />
        ))}
      </Games>
    </GameList>
  );
}
const GameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    padding: 5rem 0rem;
  }
`;
const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;

  /* display: flex;
  flex-wrap: wrap; */
`;
export default Home;
