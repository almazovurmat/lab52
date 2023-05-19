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

    public getCard(): Card {
        return this.cardDeckArray.splice(this.randomNumber(), 1)[0];
    }

    public getCards(howMany: number): Card[] {
        const cards: Card[] = [];

        for (let i = 0; i < howMany; i++) {
            cards.push(this.getCard());
        }

        return cards;
    }

    private randomNumber () {
        return Math.floor(Math.random() * this.cardDeckArray.length + 1);
    }
}

export default CardDeck;