import React from 'react';

interface ICardViewProps {
    rank: string;
    suit: string;
}


const CardView: React.FC <ICardViewProps> = props => {

    const cardClasses = `card rank-${props.rank.toLowerCase()} ${props.suit}`;

    let suit;
    switch (props.suit) {
        case 'diams':
            suit = '♦';
            break;
        case 'hearts':
            suit = '♥';
            break;
        case 'clubs':
            suit = '♣';
            break;
        case 'spades':
            suit = '♠';
            break;
        default:
            suit = 'Some Error';
            break;
    }

    return (
        <div className="playingCards faceImages">
            <span className={cardClasses}>
                <span className="rank">{props.rank}</span>
                <span className="suit">{suit}</span>
            </span>
        </div>
    );
};

export default CardView;