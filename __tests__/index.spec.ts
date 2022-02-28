import {Card, Faces, Suits} from "aces-high-core";
import {CribbageHand, CribbagePlayer} from "../src";

describe('CribbageHand', () => {
    describe('getScore() method', () => {
        it('should count his nobs', () => {
            const hand = new CribbageHand([
                new Card(Suits.HEARTS, Faces.TWO),
                new Card(Suits.CLUBS, Faces.EIGHT),
                new Card(Suits.DIAMONDS, Faces.FOUR),
                new Card(Suits.SPADES, Faces.JACK)
            ]);
            hand.CutCard = new Card(Suits.SPADES, Faces.TEN);

            expect(hand.getScore()).toEqual(1);
        });

        describe('counting sets', () => {
            it('should count one set', () => {
                const hand = new CribbageHand([
                    new Card(Suits.CLUBS, Faces.EIGHT),
                    new Card(Suits.CLUBS, Faces.QUEEN),
                    new Card(Suits.SPADES, Faces.EIGHT),
                    new Card(Suits.CLUBS, Faces.TWO)
                ]);
                hand.CutCard = new Card(Suits.HEARTS, Faces.KING);

                expect(hand.getScore()).toEqual(2);
            });

            it('should count two sets', () => {
                const hand = new CribbageHand([
                    new Card(Suits.CLUBS, Faces.EIGHT),
                    new Card(Suits.CLUBS, Faces.QUEEN),
                    new Card(Suits.SPADES, Faces.EIGHT),
                    new Card(Suits.CLUBS, Faces.TWO)
                ]);
                hand.CutCard = new Card(Suits.HEARTS, Faces.QUEEN);

                expect(hand.getScore()).toEqual(4);
            });

            it('should count a set of 3', () => {
                const hand = new CribbageHand([
                    new Card(Suits.CLUBS, Faces.EIGHT),
                    new Card(Suits.CLUBS, Faces.QUEEN),
                    new Card(Suits.SPADES, Faces.EIGHT),
                    new Card(Suits.CLUBS, Faces.TWO)
                ]);
                hand.CutCard = new Card(Suits.HEARTS, Faces.EIGHT);

                expect(hand.getScore()).toEqual(6);
            });

            it('should count a set of 4', () => {
                const hand = new CribbageHand([
                    new Card(Suits.CLUBS, Faces.EIGHT),
                    new Card(Suits.CLUBS, Faces.QUEEN),
                    new Card(Suits.SPADES, Faces.EIGHT),
                    new Card(Suits.DIAMONDS, Faces.EIGHT)
                ]);
                hand.CutCard = new Card(Suits.HEARTS, Faces.EIGHT);

                expect(hand.getScore()).toEqual(12);
            });

            it('should count a set of 3 and a set of 2', () => {
                const hand = new CribbageHand([
                    new Card(Suits.CLUBS, Faces.EIGHT),
                    new Card(Suits.CLUBS, Faces.QUEEN),
                    new Card(Suits.SPADES, Faces.EIGHT),
                    new Card(Suits.SPADES, Faces.QUEEN)
                ]);
                hand.CutCard = new Card(Suits.HEARTS, Faces.EIGHT);

                expect(hand.getScore()).toEqual(8);
            });
        });

        describe('counting fifteens', () => {
            it('should count a 2 card 15', () => {
                const hand = new CribbageHand([
                    new Card(Suits.HEARTS, Faces.TWO),
                    new Card(Suits.CLUBS, Faces.EIGHT),
                    new Card(Suits.DIAMONDS, Faces.SEVEN),
                    new Card(Suits.SPADES, Faces.FOUR)
                ]);
                hand.CutCard = new Card(Suits.SPADES, Faces.TEN);

                expect(hand.getScore()).toEqual(2);
            })

            it('should count a 3 card 15', () => {
                const hand = new CribbageHand([
                    new Card(Suits.HEARTS, Faces.THREE),
                    new Card(Suits.CLUBS, Faces.EIGHT),
                    new Card(Suits.DIAMONDS, Faces.JACK),
                    new Card(Suits.SPADES, Faces.FOUR)
                ]);
                hand.CutCard = new Card(Suits.SPADES, Faces.TEN);

                expect(hand.getScore()).toEqual(2);
            });

            it('should count a 4 card 15', () => {
                const hand = new CribbageHand([
                    new Card(Suits.HEARTS, Faces.ACE),
                    new Card(Suits.CLUBS, Faces.THREE),
                    new Card(Suits.DIAMONDS, Faces.NINE),
                    new Card(Suits.SPADES, Faces.FOUR)
                ]);
                hand.CutCard = new Card(Suits.SPADES, Faces.SEVEN);

                expect(hand.getScore()).toEqual(2);
            });
        });

        describe('counting runs', () => {
            it('should count a 3 card run', () => {
                const hand = new CribbageHand([
                    new Card(Suits.CLUBS, Faces.JACK),
                    new Card(Suits.HEARTS, Faces.FOUR),
                    new Card(Suits.SPADES, Faces.QUEEN),
                    new Card(Suits.CLUBS, Faces.TEN)
                ]);
                hand.CutCard = new Card(Suits.DIAMONDS, Faces.TWO);

                expect(hand.getScore()).toEqual(3);
            });

            it('should count a 4 card run', () => {
                const hand = new CribbageHand([
                    new Card(Suits.CLUBS, Faces.JACK),
                    new Card(Suits.HEARTS, Faces.FOUR),
                    new Card(Suits.SPADES, Faces.QUEEN),
                    new Card(Suits.CLUBS, Faces.TEN)
                ]);
                hand.CutCard = new Card(Suits.DIAMONDS, Faces.KING);

                expect(hand.getScore()).toEqual(4);
            });

            it('should count a high 5 card run', () => {
                const hand = new CribbageHand([
                    new Card(Suits.CLUBS, Faces.JACK),
                    new Card(Suits.HEARTS, Faces.NINE),
                    new Card(Suits.SPADES, Faces.QUEEN),
                    new Card(Suits.CLUBS, Faces.TEN)
                ]);
                hand.CutCard = new Card(Suits.DIAMONDS, Faces.KING);

                expect(hand.getScore()).toEqual(5);
            });

            it('should count a low 5 card run', () => {
                const hand = new CribbageHand([
                    new Card(Suits.CLUBS, Faces.ACE),
                    new Card(Suits.HEARTS, Faces.THREE),
                    new Card(Suits.SPADES, Faces.FOUR),
                    new Card(Suits.CLUBS, Faces.FIVE)
                ]);
                hand.CutCard = new Card(Suits.DIAMONDS, Faces.TWO);

                expect(hand.getScore()).toEqual(7); //extra two points because it also adds to 15
            });
        });

        describe('counting flushes', () => {
            it('should count a 4 card flush not in crib', () => {
                const hand = new CribbageHand([
                    new Card(Suits.CLUBS, Faces.TWO),
                    new Card(Suits.CLUBS, Faces.FOUR),
                    new Card(Suits.CLUBS, Faces.JACK),
                    new Card(Suits.CLUBS, Faces.TEN)
                ]);
                hand.CutCard = new Card(Suits.HEARTS, Faces.KING);

                expect(hand.getScore()).toEqual(4);
            });

            it('should not count a 4 card flush in crib', () => {
                const hand = new CribbageHand([
                    new Card(Suits.CLUBS, Faces.TWO),
                    new Card(Suits.CLUBS, Faces.FOUR),
                    new Card(Suits.CLUBS, Faces.JACK),
                    new Card(Suits.CLUBS, Faces.TEN)
                ], true);
                hand.CutCard = new Card(Suits.HEARTS, Faces.KING);

                expect(hand.getScore()).toEqual(0);
            });

            it('should count a 5 card flush not in crib', () => {
                const hand = new CribbageHand([
                    new Card(Suits.CLUBS, Faces.TWO),
                    new Card(Suits.CLUBS, Faces.FOUR),
                    new Card(Suits.CLUBS, Faces.QUEEN),
                    new Card(Suits.CLUBS, Faces.TEN)
                ]);
                hand.CutCard = new Card(Suits.CLUBS, Faces.KING);

                expect(hand.getScore()).toEqual(5);
            });

            it('should count a 5 card flush in crib', () => {
                const hand = new CribbageHand([
                    new Card(Suits.CLUBS, Faces.TWO),
                    new Card(Suits.CLUBS, Faces.FOUR),
                    new Card(Suits.CLUBS, Faces.QUEEN),
                    new Card(Suits.CLUBS, Faces.TEN)
                ], true);
                hand.CutCard = new Card(Suits.CLUBS, Faces.KING);

                expect(hand.getScore()).toEqual(5);
            });
        });

        describe('common hand situations', () => {
            it('should count 28 points', () => {
                const hand = new CribbageHand([
                    new Card(Suits.CLUBS, Faces.FIVE),
                    new Card(Suits.DIAMONDS, Faces.FIVE),
                    new Card(Suits.SPADES, Faces.FIVE),
                    new Card(Suits.CLUBS, Faces.TEN)
                ]);
                hand.CutCard = new Card(Suits.HEARTS, Faces.FIVE);

                expect(hand.getScore()).toEqual(28);
            });

            it('should count 29 points', () => {
                const hand = new CribbageHand([
                    new Card(Suits.HEARTS, Faces.FIVE),
                    new Card(Suits.DIAMONDS, Faces.FIVE),
                    new Card(Suits.SPADES, Faces.FIVE),
                    new Card(Suits.CLUBS, Faces.JACK)
                ]);
                hand.CutCard = new Card(Suits.CLUBS, Faces.FIVE);

                expect(hand.getScore()).toEqual(29);
            });

            it('should count straight 8', () => {
                const hand = new CribbageHand([
                    new Card(Suits.SPADES, Faces.ACE),
                    new Card(Suits.SPADES, Faces.TWO),
                    new Card(Suits.HEARTS, Faces.ACE),
                    new Card(Suits.SPADES, Faces.THREE)
                ]);
                hand.CutCard = new Card(Suits.CLUBS, Faces.SEVEN);

                expect(hand.getScore()).toEqual(8);
            });

            it('should count 15 2, 4 and a pair is 6', () => {
                const hand = new CribbageHand([
                    new Card(Suits.SPADES, Faces.SEVEN),
                    new Card(Suits.SPADES, Faces.EIGHT),
                    new Card(Suits.HEARTS, Faces.SEVEN),
                    new Card(Suits.SPADES, Faces.THREE)
                ]);
                hand.CutCard = new Card(Suits.CLUBS, Faces.KING);

                expect(hand.getScore()).toEqual(6);
            });

            it('should count all the straights and 15s', () => {
                const hand = new CribbageHand([
                    new Card(Suits.SPADES, Faces.SEVEN),
                    new Card(Suits.SPADES, Faces.EIGHT),
                    new Card(Suits.HEARTS, Faces.SEVEN),
                    new Card(Suits.SPADES, Faces.SIX)
                ]);
                hand.CutCard = new Card(Suits.CLUBS, Faces.NINE);

                expect(hand.getScore()).toEqual(16);
            });
        });
    });
});

describe('CribbagePlayer', () => {
    describe('constructor', () => {
        it('should use defaults when no arguments are passed', () => {
            const player = new CribbagePlayer();

            expect(player.Hand).toBeTruthy();
        });
    });

    describe('scoreHand method', () => {
        it('should increment score', () => {
            const cards = [
                new Card(Suits.HEARTS, Faces.TWO),
                new Card(Suits.DIAMONDS, Faces.FIVE),
                new Card(Suits.CLUBS, Faces.SEVEN),
                new Card(Suits.HEARTS, Faces.SEVEN),
            ];
            const hand = new CribbageHand(cards);
            hand.CutCard = new Card(Suits.SPADES, Faces.NINE);
            const player = new CribbagePlayer(hand);

            player.scoreHand();

            expect(player.Score).toEqual(2);
        });
    });
});
