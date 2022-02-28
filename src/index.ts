import {Card, CardHand, CardPlayer, Faces} from "aces-high-core";

class ArrayItem<T> {
    value: T;

    constructor(value: T) {
        this.value = value;
    }
}

class Combinations<T> {
    private readonly combinations: Array<Array<T>>
    private readonly items: Array<T>;

    get Combinations(): Array<Array<T>> {
        return this.combinations;
    }

    constructor(items: Array<T>, itemCount: number) {
        this.combinations = [];
        this.items = items;

        this.generate(itemCount, 0, []);
    }

    private generate(itemCount: number, start: number, combo: ArrayItem<T>[]) {
        itemCount--;
        for (let i = start; i < this.items.length; i++) {
            combo[itemCount] = new ArrayItem(this.items[i])
            if (itemCount == 0) {
                this.combinations.push(
                    combo
                        .map(i => i.value)
                );
            } else {
                start++;
                this.generate(itemCount, start, combo);
            }
        }

    }
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
            const combos = new Combinations(values, i);
            score += this.countFifteens(tempCards, i);

            if (i == 2) {
                score += this.countSets(combos);
            } else {
                const runs = combos.Combinations.filter(c => (Math.max(...c) - Math.min(...c) + 1) == c.length && c.length == new Set(c).size)
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
        const sumCombos = new Combinations(sumValues, comboSize).Combinations;
        let score = 0;
        sumCombos.forEach(c => {
            const sum = <number>c.reduce((i1, i2) => i1 + i2);
            if (sum == 15)
                score += 2
        });
        return score;
    }

    private countSets(combos: Combinations<number>): number {
        let score = 0;
        combos.Combinations.forEach(c => {
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
}