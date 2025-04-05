import React from "react"
import { languages } from "./languages"
import clsx from 'clsx';
import { getFarewellText } from "./utils";
import { randomWord } from "./utils";

export default function App() {

  const [currentWord, setCurrentWord] = React.useState(()=> randomWord())
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const [guessedLetter, setGuessedLetter] = React.useState([])
  const [farewellText, setFarewellText] = React.useState("");
  console.log(currentWord);

  const wrongGuessCount = guessedLetter.filter(letter => !currentWord.includes(letter)).length;

  const isGameWon = currentWord.split("").every(letter => guessedLetter.includes(letter))
  const isGameLost = wrongGuessCount === (languages.length -1 )
  const isGameOver = isGameWon || isGameLost

  React.useEffect(() => {
    if (wrongGuessCount > 0) {
      let text = getFarewellText(languages[wrongGuessCount - 1].name);
      setFarewellText(text);
    }
  }, [wrongGuessCount]);

  const elements = languages.map((x,index) => {

    const isLost = clsx({
      chip:true,
      lost: index < wrongGuessCount
    })

    return (
      <span 
          key={x.name} 
          className={isLost}
          style={{backgroundColor:x.backgroundColor,color:x.color}}
      >
        {x.name}
      </span>
    )
  })

  const word = currentWord.split("").map((x,index) => (

    <span key={index} style={{color:!guessedLetter.includes(x) ? "#EC5D49" : ""}}>
      {isGameLost ? x.toUpperCase() : guessedLetter.includes(x) && x.toUpperCase()}
    </span>

  ))


  function clickedLetter(x) {
    setGuessedLetter(prev => prev.includes(x) ? prev : [...prev, x])
  }


  const keypad = alphabet.split("").map(x => {
    const isGuessed = guessedLetter.includes(x)
    const isCorrect = isGuessed && currentWord.includes(x)
    const isWrong = isGuessed && !currentWord.includes(x)


    const className = clsx({
      correct: isCorrect,
      wrong: isWrong
    })

    return (
      <button 
          className={className} 
          disabled={isGameOver} 
          onClick={() => clickedLetter(x)} 
          aria-disabled={guessedLetter.includes(x)}
          aria-label={`Letter ${x}`}
          key={x}
      >
          {x.toUpperCase()}
      </button>
    )
  })

  const gameStatusClass = clsx("game-status", {
    green:isGameWon,
    red:isGameLost
  })

  function renderGameStatus() {
      if (!isGameOver) {
          return (
            <>
              {wrongGuessCount > 0 && <p style={{fontStyle: "italic",fontSize:"1.05rem"}}>"{farewellText}"</p>}
            </>
          )
      }
      if (isGameWon) {
          return (
            <>
              <h2>You won!</h2>
              <p>Well done! 🎉</p>
            </>
          )
      } else {
          return (
            <>
              <h2>Game over!</h2>
              <p>Better start learn Assembly now 💀</p>
            </>
          )
      }
  }

  const purpleBackground = wrongGuessCount > 0 ? { backgroundColor: "#6E539E" } : {};


  function reset() {
    setGuessedLetter([])
    setCurrentWord(randomWord())
  }

  return (
      <main>
          <header>
              <h1>Assembly - Endgame</h1>
              <p>Guess the word within 8 attempts to keep the programming world safe from Assembly</p>
          </header>

          <section aria-live="polite" role="status" className={gameStatusClass} style={purpleBackground} >
              {renderGameStatus()}
          </section>

          <section className="language-chips">
               {elements}
          </section>

          <section className="word">
               {word}
          </section> 

          {/* ACCESSIBILITY TO SCREEN READERS */}
          <section 
              className="sr-only" 
              aria-live="polite" 
              role="status"
          >
              <p>Current word: {currentWord.split("").map(x => guessedLetter.includes(x) ? x + "." : "blank.").join(" ")}</p>
          </section>

          <section className="keypad">
               {keypad}
          </section>
          {isGameOver && <section className="newGameBtn">
               <button onClick={reset}>New Game</button>
          </section>}
      </main>
  )
}


