import React, { useState, useRef } from 'react';
import CardView from "./CardView/CardView";
import CardDeck from "./lib/CardDeck";
import './App.css';
import Card from "./lib/Card";
import PokerHand from "./lib/PokerHand";

const App = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [pokerHandCombination, setPokerHandCombination] = useState<string|null>(null);
    const deckRef = useRef<CardDeck>(new CardDeck());

    const distributeCards = () => {
        setCards(deckRef.current.getCards(5));
    };

    const replaceCards = () => {
        const selectedCards = cards.filter((card) => card.selected);
        const newCards = deckRef.current.getCards(selectedCards.length);
        const updatedCards = cards.map((card) => {
            if (card.selected) {
                return newCards.pop() || card;
            }
            return card;
        });
        setCards(updatedCards);
    };

    if (cards.length <= 0) {
        return <button onClick={distributeCards}>Раздать карты</button>;
    }

    const toggleCardSelection = (rank: string, suit: string) => {
        const updatedCards = cards.map((card) => {
            if (card.rank === rank && card.suit === suit) {
                return {
                    ...card,
                    selected: !card.selected,
                };
            }
            return card;
        });

        setCards(updatedCards);
    };

    const getPokerHand = () => {
        setPokerHandCombination(new PokerHand(cards).getOutcome());
    };

    return (
        <div className="App">
            <div className="pokerHandCombination">{pokerHandCombination}</div>
            <div className="cardsBlock">
                {cards.map((card) => (
                    <CardView
                        key={card.rank + card.suit}
                        rank={card.rank}
                        suit={card.suit}
                        selected={card.selected}
                        onClick={toggleCardSelection}
                    />
                ))}
            </div>
            <div>
                <button type="button" onClick={getPokerHand}>
                    Определить текущую руку.
                </button>
                <button onClick={distributeCards}>Раздать карты</button>
                <button onClick={replaceCards}>Заменить карты</button>
            </div>
        </div>
    );
};

export default App;