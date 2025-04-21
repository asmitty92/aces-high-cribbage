import {Card, Faces, StandardDeck, Suits, getCombinations} from "aces-high-core";
import {CribbageHand} from './src'

const deck = new StandardDeck();
deck.fullShuffle();

// for (let i = 0; i < 6; i++) {
//     console.log(deck.deal().toString());
// }

const cards = [
    new Card(Suits.SPADES, Faces.EIGHT),
    new Card(Suits.CLUBS, Faces.JACK),
    new Card(Suits.CLUBS, Faces.EIGHT),
    new Card(Suits.HEARTS, Faces.FIVE),
    new Card(Suits.SPADES, Faces.TEN),
    new Card(Suits.DIAMONDS, Faces.JACK),
]

const combos = getCombinations(cards, 4);

let max = 0;
let maxHand = undefined;
const cutCard = new Card(Suits.SPADES, Faces.THREE);
for (const combo of combos) {
    const hand = new CribbageHand(combo);
    hand.cutCard = cutCard;
    const score = hand.calculateScore();
    if (score > max) {
        max = score;
        maxHand = combo;
    }
}

console.log(max);
console.log(maxHand);