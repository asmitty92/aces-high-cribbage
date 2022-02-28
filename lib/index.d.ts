import { Card, CardHand } from "aces-high-core";
export declare class CribbageHand implements CardHand {
    private readonly cards;
    private cutCard;
    get Cards(): Array<Card>;
    set CutCard(value: Card);
    constructor(cards: Array<Card>);
    scoreHand(): number;
    getCombos<T>(items: Array<T>): Array<Array<T>>;
}
