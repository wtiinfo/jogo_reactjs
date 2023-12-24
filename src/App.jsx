
import './App.css';
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

import { useCallback, useEffect, useState } from 'react';
import { wordsList } from "./data/words";


//Possivel criar fora da function
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
];

function App() {


  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);//LISTA DE LETRAS


  const pickWordAndCategory = () => {
    //pegando uma categoria aleatoriamente
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    console.log(category);

    //pegando uma palavra dentro da categoria atual
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    console.log(word);

    return { word, category };
  };

  //mudando tela
  const startGame = () => {
    //pegar a palavra e a categoria
    const { word, category } = pickWordAndCategory();
    
    // criando um array com a palavra sorteada
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    console.log(wordLetters);
    //atualizando states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(letters);

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
