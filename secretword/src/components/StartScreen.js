//CSS
import './StartScreen.css';


const StartScreen = ({startGame}) => {
    return (
        <div className={'start'}>
            <h2>Secret Word</h2>
            <p>Clique em começar para iniciar o jogo</p>
            <button onClick={startGame}>Começar</button>
        </div>
    )
}
export default StartScreen;

