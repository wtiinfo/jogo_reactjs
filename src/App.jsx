/* eslint-disable no-unused-vars */

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

const guessesQty = 3;

function App() {


  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);//LISTA DE LETRAS

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);



  const pickWordAndCategory = useCallback(() => {
    //pegando uma categoria aleatoriamente
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //pegando uma palavra dentro da categoria atual
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    console.log(word);

    return { word, category };
  }, [words]);

  //mudando tela
  const startGame = useCallback(() => {
    //limpando todas as letras
    clearLetterStates();

    //pegar a palavra e a categoria
    const { word, category } = pickWordAndCategory();

    // criando um array com a palavra sorteada
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    //atualizando states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  //processar letra inserida
  const verifyLetter = (letter) => {
    //padronizando a letra para o formato correto
    const normalizedLetter = letter.toLowerCase();

    //checando se a letra ja foi usada
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }

    //guarda a letra adivinha ou descata o palpite
    if (letters.includes(normalizedLetter)) {
      //pode ser letter no final
      setGuessedLetters((actualGuessedLetters) => [...actualGuessedLetters, letter]);
    } else {
      setWrongLetters((actualWrongLetters) => [...actualWrongLetters, normalizedLetter]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  }

  //restart
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  }

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  // checagem de tentativas finalizadas

  useEffect(() => {
    if (guesses === 0) {
      //reset todos os states para previnir o reset do jogo com 0 tentativas
      clearLetterStates();

      setGameStage(stages[2].name);

    }
  }, [guesses]);


  //checagem de condição de vitória
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    //condicao de vitoria
    if (guessedLetters.length === uniqueLetters.length) {
      //adicionar score
      setScore((actualScore) => actualScore += 100);

      //reinicia o game com uma nova palavra
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  return (
    <>
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score} />}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </>
  );
}

export default App
