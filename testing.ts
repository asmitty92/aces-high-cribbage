import {StandardDeck} from "aces-high-core";
import {CribbageHand} from "./src";

class StopWatch {
    private _start: number;
    private _stop: number;

    constructor() {
    }

    start() {
        this._start = Date.now();
        return this;
    }

    stop() {
        this._stop = Date.now();
    }

    displayElapsed() {
        console.log(`Start-${this._start} : Stop-${this._stop} : Difference-${(this._stop - this._start) / 1000}-seconds`);
    }
}

const scores = [...Array(30)].map(() => 0);
const stopwatch = new StopWatch().start();
const totalIterations = 100000;

const roundTo = (value: number, decimalPlaces: number = 2) => {
    const tens = Math.pow(10, decimalPlaces);
    return Math.round(value * tens) / tens;
};

const calculatePercentage = (value: number, total: number) => {
    return roundTo((value / total) * 100, 3);
};

for (let i = 0; i < totalIterations; i++) {
    const deck = new StandardDeck();
    deck.fullShuffle();

    const cards = [];
    [0, 0, 0, 0].forEach(() => {
        cards.push(deck.dealCard());
    });

    const hand = new CribbageHand(cards);
    hand.CutCard = deck.dealCard();

    const score = hand.getScore();
    scores[score] += 1;

    if ([28, 29].some(val => val == score)) {
        console.log('Found max hand');
    }
}

stopwatch.stop();

for (let i in scores) {
    console.log(`${i}: ${scores[i]}: ${calculatePercentage(scores[i], totalIterations)}%`);
}
stopwatch.displayElapsed();