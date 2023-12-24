
import './App.css';
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

import { useCallback, useEffect, useState } from 'react';
import { wordsList } from "./data/words";


//Possivel criar fora da function
const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
];

function App() {


  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  //mudando tela
  const startGame = () => {
    setGameStage(stages[1].name);
  }

  //processar letra inserida
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  }

  //restart
  const retry = () => {
    setGameStage(stages[0].name);
  }

  return (
    <>
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} />}
      {gameStage === "end" && <GameOver retry={retry} />}
    </>
  )
}

export default App
