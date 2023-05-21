import React from 'react';

interface ICardViewProps {
    rank: string;
    suit: string;
    selected: boolean;
    onClick: (rank: string, suit: string) => void;
}


const CardView: React.FC <ICardViewProps> = props => {

    const cardClasses = `card rank-${props.rank.toLowerCase()} ${props.suit} ${props.selected ? 'selected' : ''}`;

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

    const handleCardClick = () => {
        props.onClick(props.rank, props.suit);
    };

    return (
        <div className="playingCards faceImages">
            <span className={cardClasses} onClick={handleCardClick}>
                <span className="rank">{props.rank}</span>
                <span className="suit">{suit}</span>
            </span>
        </div>
    );
};

export default CardView;