import {Card, CardHand, CardPlayer, Faces} from "aces-high-core";

class ArrayItem<T> {
    value: T;

    constructor(value: T) {
        this.value = value;
    }
}

function getCombinations<T>(items: T[], itemCount: number) {
    let combinations = [];

    function generateCombinations(count: number, start: number, combo: ArrayItem<T>[]) {
        count--;
        for (let i = start; i < items.length; i++) {
            combo[count] = new ArrayItem(items[i])
            if (count == 0) {
                combinations.push(
                    combo
                        .map(i => i.value)
                );
            } else {
                start++;
                generateCombinations(count, start, combo);
            }
        }
    }

    generateCombinations(itemCount, 0, []);

    return combinations;
}

export class CribbageHand extends CardHand {
    protected _cutCard: Card;

    get cutCard(): Card {
        return this._cutCard;
    }

    set cutCard(value: Card) {
        this._cutCard = value;
    }

    constructor(cards: Array<Card>, private isCrib: boolean = false) {
        super(cards)
    }

    calculateScore(): number {
        const runCounts = {3: 0, 4: 0, 5: 0};
        let score = 0;

        score += this.countNobs();
        score += this.countFlush();

        const tempCards = this.cards.concat([this.cutCard]);
        const values = tempCards.map(c => c.value);

        for (let i = 2; i <= tempCards.length; i++) {
            // const combos = new Combinations(values, i);
            const combos = getCombinations(values, i);
            score += this.countFifteens(tempCards, i);

            if (i == 2) {
                score += this.countSets(combos);
            } else {
                const runs = combos.filter(c => (Math.max(...c) - Math.min(...c) + 1) == c.length && c.length == new Set(c).size)
                score += runs.length * i
                runCounts[i] = runs.length;
                if (i > 3 && runs.length > 0) {
                    score -= runCounts[i - 1] * (i - 1)
                }
            }
        }

        return score;
    }

    private countNobs(): number {
        if (!!this.cutCard && this.cards.some(card => card.suit == this.cutCard.suit && card.face == Faces.JACK)) {
            return 1;
        }
        return 0;
    }

    private countFifteens(tempCards: Card[], comboSize: number): number {
        const sumValues = tempCards.map(c => c.value >= 10 ? 10 : c.value);
        const sumCombos = getCombinations(sumValues, comboSize);
        let score = 0;
        sumCombos.forEach(c => {
            const sum = <number>c.reduce((i1, i2) => i1 + i2);
            if (sum == 15)
                score += 2
        });
        return score;
    }

    private countSets(combos: Array<Array<number>>): number {
        let score = 0;
        combos.forEach(c => {
            if (c[0] == c[1])
                score += 2;
        });
        return score;
    }

    private countFlush(): number {
        const suits = new Set(this.cards.map(c => c.suit));
        if (suits.size == 1) {
            if (!!this.cutCard && suits.has(this.cutCard.suit)) {
                return 5
            } else {
                return this.isCrib ? 0 : 4;
            }
        }
        return 0;
    }
}

export class CribbagePlayer extends CardPlayer {
    protected isComputer: boolean;

    get Score(): number {
        return this.score;
    }

    constructor(hand: CribbageHand, isComputer: boolean = false) {
        super(hand);
        this.isComputer = isComputer;
        this.myScore = 0;
    }

    scoreHand(): any {
        this.myScore += this.hand.calculateScore();
    }

    compPassToCrib(): [Card, Card] {
        const combinations = getCombinations(this.hand.cards, 4);
        let maxScore = 0;
        let maxHand = undefined as CribbageHand;
        for (const combo of combinations) {
            const hand = new CribbageHand(combo);
            hand.cutCard = (this.hand as CribbageHand).cutCard;
            const score = hand.calculateScore();
            if (score > maxScore) {
                maxScore = score;
                maxHand = hand;
            }
        }
        const [card1, card2] = this.hand.cards.filter(card => !maxHand.cards.includes(card));
        this.myHand = maxHand;
        return [card1, card2];
    }
}
