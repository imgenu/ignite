import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { loadGames } from "../actions/gamesAction";
import Game from "../components/Game";
import GameDetail from "../components/GameDetail";
import { useLocation } from "react-router-dom";
function Home() {
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  console.log(pathId);
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);
  //const games = useSelector((state) => state.games); // 此處的game是rootReducer取得的
  const { popular, newGames, upcoming, search } = useSelector(
    (state) => state.games
  );

  return (
    <GameList>
      {/* <AnimateSharedLayout> */}
      <AnimatePresence>
        {pathId && (
          <GameDetail
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            pathId={pathId}
          />
        )}
      </AnimatePresence>
      {search.length ? (
        <div>
          <h2>Search Games</h2>
          <Games>
            {search.map((game) => (
              <Game game={game} key={game.id} id={game.id} />
            ))}
          </Games>
        </div>
      ) : (
        ""
      )}

      <h2>Popular Games</h2>
      <Games>
        {popular.map((game) => (
          <Game game={game} key={game.id} id={game.id} />
        ))}
      </Games>
      <h2>New Games</h2>
      <Games>
        {newGames.map((game) => (
          <Game game={game} key={game.id} id={game.id} />
        ))}
      </Games>
      {/* </AnimateSharedLayout> */}
    </GameList>
  );
}
const GameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    padding: 3rem 0rem;
  }
  @media screen and (max-width: 786px) {
    padding: 0rem 2rem;
    h2 {
      padding: 2rem 0rem;
    }
  }
`;
const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 3rem;

  /* display: flex;
  flex-wrap: wrap; */
`;
export default Home;
