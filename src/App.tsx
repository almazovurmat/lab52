import React, {useState} from 'react';
import CardView from "./CardView/CardView";
import CardDeck from "./lib/CardDeck";
import './App.css';
import Card from "./lib/Card";
import PokerHand from "./lib/PokerHand";

const App = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [pokerHandCombination, setPokerHandCombination] = useState<string|null>(null);

    const distributeCards = () => {
        setCards((new CardDeck().getCards(5)));
    };

    if (cards.length <= 0) {
        return <button onClick={distributeCards}>Раздать карты</button>
    }

    const pokerHand = () => {
        setPokerHandCombination(new PokerHand(cards).getOutcome());
    };

    return (
        <div className="App">
            <div className="pokerHandCombination">
                {pokerHandCombination}
            </div>
            <div className="cardsBlock">
            {
                cards.map(card => {
                    return <CardView key={card.rank + card.suit} rank={card.rank} suit={card.suit}/>
                })
            }
            </div>
            <div >
                <button type={"button"} onClick={() => {
                    pokerHand()
                }}>Определить текущую руку.</button>
                <button onClick={distributeCards}>Раздать карты</button>
            </div>
        </div>
    );
};

export default App;
