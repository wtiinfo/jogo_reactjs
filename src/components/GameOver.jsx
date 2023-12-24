import "./GameOver.css";

const GameOver = ({ retry }) => {
    return (
        <div>
            <h1>Tente novamente</h1>
            <button onClick={retry}>Reiniciar partida</button>
        </div>
    );
}

export default GameOver;
