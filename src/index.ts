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
    private cutCard: Card;

    set CutCard(value: Card) {
        this.cutCard = value;
    }

    constructor(cards: Array<Card>, private isCrib: boolean = false) {
        super(cards)
    }

    getScore(): number {
        const runCounts = {3: 0, 4: 0, 5: 0};
        let score = 0;

        score += this.countNobs();
        score += this.countFlush();

        const tempCards = this.Cards.concat([this.cutCard]);
        const values = tempCards.map(c => <number>c.face);

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
        if (!!this.cutCard && this.Cards.some(card => card.suit == this.cutCard.suit && card.face == Faces.JACK)) {
            return 1;
        }
        return 0;
    }

    private countFifteens(tempCards: Card[], comboSize: number): number {
        const sumValues = tempCards.map(c => c.face >= 10 ? 10 : c.face);
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
        const suits = new Set(this.Cards.map(c => c.suit));
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
    protected score: number;
    protected isComputer: boolean;

    get Score(): number {
        return this.score;
    }

    constructor(hand: CribbageHand = null, isComputer: boolean = false) {
        super(hand ?? new CribbageHand([]));
        this.isComputer = isComputer;
        this.score = 0;
    }

    scoreHand(): any {
        this.score += this.Hand.getScore();
    }

    compPassToCrib(): [Card, Card] {
        return [null, null];
    }
}
