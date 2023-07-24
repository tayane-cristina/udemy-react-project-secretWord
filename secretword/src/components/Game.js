import { useState, useRef } from 'react';
import './Game.css'

const Game = ({
    verifyLetter, 
    score, 
    guessLetters, 
    wrongLetters,
    guessedLetters, 
    choiseWord, 
    choiseCategory, 
    letters
    }) => {
        const [letter, setLetter] = useState("")
        const letterInputref = useRef(null)

        const handleSubmit = (e) => {
          e.preventDefault();

          verifyLetter(letter)

          setLetter("")
          letterInputref.current.focus()
        }

    return (
        <div className='game'>
            <p className='point'>
                <span>Pontuação:{score}</span>
            </p>
            <h1>Advinhe a palavra:</h1>
            <h3>Dica: 
                <span className='tip'>{choiseCategory}</span>
            </h3>
            <p>Você ainda tem {guessLetters} tentativa(s)</p>
            <div className='wordContainer'>
                {letters.map((letter, i) => 
                    guessedLetters.includes(letter) ? (
                        <span key={i} className="letter">{letter}</span>
                    ): (
                        <span key={i} className="blankSquare"></span>
                    )
                    )}
                
            </div>
            <div className='lettersContainer'>
                <p>Tente advinhar uma letra da palavra</p>
                <form onSubmit={handleSubmit}>
                    <input 
                    type="text" 
                    name='letter' 
                    maxLength="1" 
                    required 
                    onChange={(e) => setLetter(e.target.value)} value={letter}
                    ref={letterInputref}
                    ></input>
                    <button className='guessLetter'>Jogar</button>
                </form>
            </div>
            <div className='wrongLettersConatiner'>
                <p>Letras já utilizadas: </p>
                {wrongLetters.map((letter, i) => 
                <span key={i}>{letter}, </span>)}
                
            </div>
        </div>
    )
}
export default Game;