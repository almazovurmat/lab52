import React, {useState} from 'react';
import CardView from "./CardView/CardView";
import CardDeck from "./lib/CardDeck";
import './App.css';
import Card from "./lib/Card";

const App = () => {
    const [cards, setCards] = useState<Card[]> ([]);

    const distributeCards = () => {
        setCards((new CardDeck().getCards(5)));
    };

    if (cards.length <= 0) {
        return <button onClick={distributeCards}>Раздать карты</button>
    }

    return (
        <div className="App">
            {
                cards.map(card => {
                    return <CardView key={card.rank+card.suit} rank={card.rank} suit={card.suit}/>
                })
            }
            <button onClick={distributeCards}>Раздать карты</button>
        </div>
    );
};

export default App;
