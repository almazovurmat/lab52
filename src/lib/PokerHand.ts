import Card from "./Card";

class PokerHand {

    private result: Card[] = [];

    private cards: Card[] = [];

    constructor(cardsArray: Card[]) {
        this.cards = cardsArray;
    }

    public countRank = () => {
        interface ICountRang {
            [rank: string]: number;
        }

        const countRang: ICountRang = {};
        this.result.forEach((Card) => {
            const rank = Card.rank;
            countRang[rank] = (countRang[rank] || 0) + 1;
        });

        return countRang;
    }

    public countSuit = () => {
        interface ICountSuit {
            [rank: string]: number;
        }

        const countSuit: ICountSuit = {};
        this.result.forEach((Card) => {
            const suit = Card.suit;
            countSuit[suit] = (countSuit[suit] || 0) + 1;
        });

        return countSuit;
    }

    public getOutcome(): string {
        this.findCombination();

        let combination: string = "Нет ни одной кобинации";

        if (this.result.length === 2) {
            combination = 'Одна пара (one pair)';
        } else if (this.result.length === 3) {
            combination = 'Тройка (three of a kind)';
        } else if (this.result.length === 4) {
            const countRang = this.countRank();

            Object.keys(countRang).forEach(key => {
                if (countRang[key] === 4) {
                    combination = 'Каре/Четвёрка/Покер (four of a kind)';
                }
            });

            if (Object.keys(countRang).length === 2) {
                combination = 'Две пары (two pairs)';
            }
        } else if (this.result.length === 5) {

            const countSuit = this.countSuit();
            const countRang = this.countRank();

            if (Object.keys(countRang).length === 5 && Object.keys(countSuit).length === 1) {
                const royalFlushKeys = ["10", "J", "Q", "K", "A"];
                let isRoyalFlush = false;
                if (royalFlushKeys.every(key => key in countRang)) {
                    isRoyalFlush = true;
                    combination = 'Роял-флэш (Royal flush)';
                }

                const sortRank = Object.keys(countRang).sort();

                const keysInOrder = sortRank.every((key, index, keys) => {
                    if (index === 0) {
                        return true;
                    }
                    const prevKey = keys[index - 1];
                    return Number(key) === Number(prevKey) + 1;
                });

                if (keysInOrder) {
                    combination = 'Стрит-флэш (straight flush)';
                }

                if (Object.keys(countSuit).length === 1 && !isRoyalFlush && !keysInOrder) {
                    combination = 'Флэш (flush)';
                }

            } else {

                if (Object.keys(countRang).length === 2) {
                    combination = 'Фулл-хаус (full house)';
                }
            }
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

        this.result = draftArray.reduce((uniqueArray: Card[], cardObj) => {
            if (!uniqueArray.includes(cardObj)) {
                uniqueArray.push(cardObj);
            }
            return uniqueArray;
        }, []);
    }

    private findObjectsByProperty(propertyName: string, propertyValue: string) {
        return this.cards.filter(function (Card) {
            const temp = Card[propertyName as keyof typeof Card];
            return temp === propertyValue;
        });
    }
}

export default PokerHand;