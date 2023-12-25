import "./GameOver.css";

const GameOver = ({ retry, score }) => {
    return (
        <div>
            <h1>Fim do jogo</h1>
            <h2>Sua pontução foi: <span>{score} </span></h2>
            <button onClick={retry}>Reiniciar partida</button>
        </div>
    );
}

export default GameOver;
