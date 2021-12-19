import './App.css'
import React, { useState, useEffect } from "react";
import SingleCard from './component/SingleCard';
let cardImages = [
  { "src": "/img/sword-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/helmet-1.png", matched: false }
]

function App() {

  const [cards, setcards] = useState([])
  const [turns, setturns] = useState(0)
  const [ChoiceOne, setChoiceOne] = useState(null)
  const [ChoiceTwo, setChoiceTwo] = useState(null)
  const [Disabled, setDisabled] = useState(false)

  const suffleCards = () => {
    const suffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setcards(suffleCards)
    setChoiceOne(null)
    setChoiceTwo(null)
    setturns(0)
  }
  //handle a choice
  const handleChoice = (card) => {
    ChoiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare two selected choice
  useEffect(() => {

    if (ChoiceOne && ChoiceTwo) {
      setDisabled(true)
      if (ChoiceOne.src === ChoiceTwo.src) {
        //console.log("Those card matched")
        setcards(prevCards => {
          return prevCards.map(card => {
            if (card.src === ChoiceOne.src) {
              return { ...card, matched: true }
            }
            else {
              return card;
            }
          })
        })
        resetTurns()
      }
      else {
        // console.log("Those card do not matched")
        setTimeout(() => resetTurns(), 1000);

      }
    }
  }, [ChoiceOne, ChoiceTwo])

  console.log(cards)

  //reset choices and increse turns
  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setturns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //start a new game automatically
  useEffect(() => {
    suffleCards()
  }, [])
  return (
    <div className="App">
      <h1>Kiddo Play_Card</h1>
      <button onClick={suffleCards}>Restart</button>
      <div className='card-grid'>
        {
          cards.map(card => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === ChoiceOne || card === ChoiceTwo || card.matched}
              disabled={Disabled}
            />
          ))}
      </div>
      <p>Turns :{turns}</p>
    </div>
  );
}

export default App