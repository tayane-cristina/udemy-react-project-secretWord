import './GameOver.css'

const GameOver = ({retry, score}) => {
    return (
        <div>
            <h1>Fim de Jogo!</h1>
            <h2>Sua pontuação é: {score}</h2>
            <button onClick={retry}>REINICIAR</button>
        </div>
    )
}
export default GameOver;