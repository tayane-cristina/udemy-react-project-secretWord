//CSS
import './App.css';
import './index.css'

//COMPONENTS
import StartScreen from './components/StartScreen';

//REACT
import {useCallback, useEffect, useState} from 'react' 

//DATA
import { wordsList } from './data/word';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
    {id: 1, name: "start"},
    {id: 2, name: "game"},
    {id: 3, name: "end"}
]

function App() {
//STATES
const [gameStage, setGameStage] = useState(stages[0].name) //<-- Nome do estágio do jogo
const [words] = useState(wordsList)

const [choiseWord, setChoiseWord] = useState("") // <-- Escolha da palavra
const [choiseCategory, setChoiseCatgory] = useState("")
const [letters, setLetters] = useState([])

const [guessedLetters, setGuessedLetters] = useState([])
const [wrongLetters, setWrongLetters] = useState([])
const [guessLetters, setGuessLetters ] = useState(3)
const [score, setScore] = useState(0)

const pickWordAndCategory = useCallback(() => {
  //pick a random category
  const categories = Object.keys(words)
  const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
  
  // Pick a random word
  const word = words[category][Math.floor(Math.random() * words[category].length)]

  return {word, category};

},[words]);


// START THE GAME
const startGame = useCallback(() => {
  //Clear all states letters
  clearLetterStates()

  // Pick word and Pick category
  const {word, category} = pickWordAndCategory()

  // create an array of letters
  let wordLetters = word.split("")
  wordLetters = wordLetters.map((letter) => letter.toLowerCase())
  console.log(wordLetters)

  //fill states
  setChoiseWord(word)
  setChoiseCatgory(category)
  setLetters(wordLetters)

  setGameStage(stages[1].name)
}, [pickWordAndCategory]);


//PROCESS THE LETTER INPUT
const verifyLetter = (letter) => {

  const normalizedLetter = letter.toLowerCase()

    //CHECK IF LETTER HAS ALREADY BEEN UTILIZED

    if (guessedLetters.includes(normalizedLetter) || 
    wrongLetters.includes(normalizedLetter))
    {
      return;
    }

    if (letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizedLetter,
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter,
      ],
      setGuessLetters((currentValue) => currentValue - 1)
      )
    };
  }

  //CHECK IF GUESS ENDED
    useEffect(() => {
      //RESET ALL STATES

      if (guessLetters <= 0){
        setGameStage(stages[2].name)
      }
    }, [guessLetters])

  //CHECK IF WIN
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]

if (guessedLetters.length === uniqueLetters.length){
  setScore((actualScore) => actualScore += 100)

  //RESTART THE GAME WITH NEW WORD
  startGame()
}

  }, [guessedLetters, letters, startGame])

  const clearLetterStates = () => {
    setGuessLetters(3)
    setWrongLetters([])
    setGuessedLetters([])
  }

//RESTART THE GAME
const retry = () => {
  setScore(0)
  setGameStage(stages[0].name)
  clearLetterStates()
}



  return (
    <div className="App">
       {gameStage === "start" && <StartScreen startGame={startGame}/>}
       {gameStage === "game" && <Game 
        verifyLetter={verifyLetter} 
        choiseWord={choiseWord} 
        choiseCategory={choiseCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guessLetters={guessLetters}
        score={score}
        />}
       {gameStage === "end" && <GameOver retry={retry} score={score}/>}
       
    </div>
  );
}

export default App;
