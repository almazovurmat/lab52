import Card from "./Card";
import card from "./Card";

class PokerHand {

    private result: Card[] = [];

    private cards: Card[] = [];

    // private cards: Card[] = [
    //     (new Card("K", "diams")),
    //     (new Card("Q", "diams")),
    //     (new Card("3", "diams")),
    //     (new Card("10", "diams")),
    //     (new Card("J", "xz")),
    // ];

    constructor(cardsArray: Card[]) {
        this.cards = cardsArray;
    }

    public getOutcome():string {
        this.findCombination();

        let combination: string = "Нет ни одной кобинации";

        if (this.result.length === 2) {
            combination = 'Одна пара (one pair)';
        } else if (this.result.length === 3) {
            combination = 'Тройка (three of a kind)';
        } else if (this.result.length === 4) {
            combination = 'Две пары (two pairs)';
        } else if (this.result.length === 5) {
            combination = 'Флэш (flush)';
        }

        return combination;
    }


    private findCombination() {
        const draftArray: Card[] = [];
        for (let i = 0; i < this.cards.length; i++) {
            if (this.findObjectsByProperty('rank', this.cards[i].rank).length > 1 || this.findObjectsByProperty('suit', this.cards[i].suit).length === 5) {
                const isFlush = this.findObjectsByProperty('suit', this.cards[i].suit);
                if (isFlush.length === 5) {
                    isFlush.forEach(card => {
                        draftArray.push(card);
                    });
                } else {
                    const value = this.findObjectsByProperty('rank', this.cards[i].rank);
                    value.forEach(card => {
                        draftArray.push(card);
                    });
                }
            }
        }

        this.result = draftArray.reduce((uniqueArray:Card[], cardObj) => {
            if (!uniqueArray.includes(cardObj)) {
                uniqueArray.push(cardObj);
            }
            return uniqueArray;
        }, []);
    }

    private findObjectsByProperty(propertyName: string, propertyValue: string){
        return this.cards.filter(function(obj) {
            const temp = obj[propertyName as keyof typeof obj];
            return temp === propertyValue;
        });
    }
}

export default PokerHand;