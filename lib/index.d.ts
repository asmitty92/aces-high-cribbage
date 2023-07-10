import { Card, CardHand, CardPlayer } from "aces-high-core";
export declare class CribbageHand extends CardHand {
    private isCrib;
    private cutCard;
    set CutCard(value: Card);
    constructor(cards: Array<Card>, isCrib?: boolean);
    getScore(): number;
    private countNobs;
    private countFifteens;
    private countSets;
    private countFlush;
}
export declare class CribbagePlayer extends CardPlayer {
    protected score: number;
    protected isComputer: boolean;
    get Score(): number;
    constructor(hand?: CribbageHand, isComputer?: boolean);
    scoreHand(): any;
    compPassToCrib(): [Card, Card];
}
