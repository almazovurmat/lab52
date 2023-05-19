import Card from "./Card";

class CardDeck {

    private readonly ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

    private readonly suits = ["diams", "hearts", "clubs", "spades"];

    public cardDeckArray: Card[] = [];

    constructor() {
        this.suits.forEach((suit) => {
            this.ranks.forEach(rank => {
                this.cardDeckArray.push(new Card(rank, suit));
            });
        });
    }
}

export default CardDeck;