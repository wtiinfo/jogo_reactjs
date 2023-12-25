/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./Game.css";
import { useState, useRef } from 'react';
 
const Game = ({ 
    verifyLetter, 
    pickedWord, 
    pickedCategory, 
    letters, 
    guessedLetters,
    wrongLetters, 
    guesses, 
    score}) => {

    const [letter, setLetter] = useState("");
    const letterInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        verifyLetter(letter);
        setLetter(""); // limpando o campo de input
        letterInputRef.current.focus(); // trazendo o foco para o input, usando a valor null como padrao
    }

    return (
        <div className="game">
            <p className="points">
                <span>Potuação: {score}</span>
            </p>
            <h1>Adivinhe a palavra:</h1>
            <h3 className="tip">
                Dica sobre a palavra: <span>{pickedCategory}</span>
            </h3>
            <p>Você ainda tem {guesses} tentativa{guesses > 1 ? (<span>s</span>) : ("")}</p>
            <div className="wordContainer">
                {letters.map((l, index) => (
                    guessedLetters.includes(l) ? 
                    (<span key={index} className="letter">{l}</span>) : 
                    (<span key={index} className="blankSquare"></span>)
                ))}
            </div>

            <div className="letterContainer">
                <p>Tente adivinhar uma letra da palavra:</p>
                <form onSubmit={handleSubmit}>
                    <input ref={letterInputRef} onChange={(e) => setLetter(e.target.value)} value={letter} type="text" name="letter" maxLength="1" required />
                    <button>Jogar</button>
                </form>
            </div>

            <div className="wrongLettersContainer">
                <p>Letras já utilizadas</p>
                {wrongLetters.map((l, index) => 
                <span key={index}>{l},</span>)}
            </div>
        </div>
    );
}

export default Game;
