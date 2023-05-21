
class Card {
    public rank: string;
    public suit: string;
    public selected: boolean;

    constructor(rank: string, suit: string) {
        this.rank = rank;
        this.suit = suit;
        this.selected = false;
    }
}

export default Card;