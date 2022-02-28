import { Card, CardHand } from "aces-high-core";
export declare class CribbageHand implements CardHand {
    private isCrib;
    private readonly cards;
    private cutCard;
    get Cards(): Array<Card>;
    set CutCard(value: Card);
    constructor(cards: Array<Card>, isCrib?: boolean);
    scoreHand(): number;
    private countNobs;
    private countFifteens;
    private countSets;
    private countFlush;
}
