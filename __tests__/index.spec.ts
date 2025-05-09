import { Card, Faces, Suits } from "aces-high-core";
import { CribbageHand, CribbagePlayer, CribbageGame } from "../src";

describe("CribbageHand", () => {
  describe("calculateScore() method", () => {
    describe("counting his nobs", () => {
      it("counts his nobs", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.HEARTS, Faces.TWO),
            new Card(Suits.CLUBS, Faces.EIGHT),
            new Card(Suits.DIAMONDS, Faces.FOUR),
            new Card(Suits.SPADES, Faces.JACK),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.SPADES, Faces.TEN);

        expect(hand.calculateScore()).toEqual(1);
      });

      it("does not count his nobs when suits don't match", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.HEARTS, Faces.TWO),
            new Card(Suits.CLUBS, Faces.EIGHT),
            new Card(Suits.DIAMONDS, Faces.SIX),
            new Card(Suits.SPADES, Faces.JACK), // Not matching cut card suit
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.CLUBS, Faces.FOUR);

        expect(hand.calculateScore()).toEqual(0);
      });
    });

    describe("counting sets", () => {
      it("counts one set", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.CLUBS, Faces.EIGHT),
            new Card(Suits.CLUBS, Faces.QUEEN),
            new Card(Suits.SPADES, Faces.EIGHT),
            new Card(Suits.CLUBS, Faces.TWO),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.HEARTS, Faces.KING);

        expect(hand.calculateScore()).toEqual(2);
      });

      it("counts two sets", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.CLUBS, Faces.EIGHT),
            new Card(Suits.CLUBS, Faces.QUEEN),
            new Card(Suits.SPADES, Faces.EIGHT),
            new Card(Suits.CLUBS, Faces.TWO),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.HEARTS, Faces.QUEEN);

        expect(hand.calculateScore()).toEqual(4);
      });

      it("counts a set of 3", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.CLUBS, Faces.EIGHT),
            new Card(Suits.CLUBS, Faces.QUEEN),
            new Card(Suits.SPADES, Faces.EIGHT),
            new Card(Suits.CLUBS, Faces.TWO),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.HEARTS, Faces.EIGHT);

        expect(hand.calculateScore()).toEqual(6);
      });

      it("counts a set of 4", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.CLUBS, Faces.EIGHT),
            new Card(Suits.CLUBS, Faces.QUEEN),
            new Card(Suits.SPADES, Faces.EIGHT),
            new Card(Suits.DIAMONDS, Faces.EIGHT),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.HEARTS, Faces.EIGHT);

        expect(hand.calculateScore()).toEqual(12);
      });

      it("counts a set of 3 and a set of 2", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.CLUBS, Faces.EIGHT),
            new Card(Suits.CLUBS, Faces.QUEEN),
            new Card(Suits.SPADES, Faces.EIGHT),
            new Card(Suits.SPADES, Faces.QUEEN),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.HEARTS, Faces.EIGHT);

        expect(hand.calculateScore()).toEqual(8);
      });
    });

    describe("counting fifteens", () => {
      it("counts a 2 card 15", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.HEARTS, Faces.TWO),
            new Card(Suits.CLUBS, Faces.EIGHT),
            new Card(Suits.DIAMONDS, Faces.SEVEN),
            new Card(Suits.SPADES, Faces.FOUR),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.SPADES, Faces.TEN);

        expect(hand.calculateScore()).toEqual(2);
      });

      it("counts a 3 card 15", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.HEARTS, Faces.THREE),
            new Card(Suits.CLUBS, Faces.EIGHT),
            new Card(Suits.DIAMONDS, Faces.JACK),
            new Card(Suits.SPADES, Faces.FOUR),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.SPADES, Faces.TEN);

        expect(hand.calculateScore()).toEqual(2);
      });

      it("counts a 4 card 15", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.HEARTS, Faces.ACE),
            new Card(Suits.CLUBS, Faces.THREE),
            new Card(Suits.DIAMONDS, Faces.NINE),
            new Card(Suits.SPADES, Faces.FOUR),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.SPADES, Faces.SEVEN);

        expect(hand.calculateScore()).toEqual(2);
      });
    });

    describe("counting runs", () => {
      it("counts a 3 card run", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.CLUBS, Faces.JACK),
            new Card(Suits.HEARTS, Faces.FOUR),
            new Card(Suits.SPADES, Faces.QUEEN),
            new Card(Suits.CLUBS, Faces.TEN),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.DIAMONDS, Faces.TWO);

        expect(hand.calculateScore()).toEqual(3);
      });

      it("counts a triple 3 card run", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.HEARTS, Faces.THREE),
            new Card(Suits.DIAMONDS, Faces.FOUR),
            new Card(Suits.SPADES, Faces.FIVE),
            new Card(Suits.CLUBS, Faces.THREE),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.HEARTS, Faces.THREE);

        expect(hand.calculateScore()).toEqual(21); // Three 3s = 6 + 3 runs of 3 = 9 + 3 fifteens = 6
      });

      it("counts a 4 card run", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.CLUBS, Faces.JACK),
            new Card(Suits.HEARTS, Faces.FOUR),
            new Card(Suits.SPADES, Faces.QUEEN),
            new Card(Suits.CLUBS, Faces.TEN),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.DIAMONDS, Faces.KING);

        expect(hand.calculateScore()).toEqual(4);
      });

      it("counts a double 4 card run", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.HEARTS, Faces.THREE),
            new Card(Suits.DIAMONDS, Faces.FOUR),
            new Card(Suits.SPADES, Faces.FIVE),
            new Card(Suits.CLUBS, Faces.THREE),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.CLUBS, Faces.SIX);

        expect(hand.calculateScore()).toEqual(14); // Two runs of 4 = 8 + pair of 3s = 2 + 2 fifteens = 4
      });

      it("counts a high 5 card run", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.CLUBS, Faces.JACK),
            new Card(Suits.HEARTS, Faces.NINE),
            new Card(Suits.SPADES, Faces.QUEEN),
            new Card(Suits.CLUBS, Faces.TEN),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.DIAMONDS, Faces.KING);

        expect(hand.calculateScore()).toEqual(5);
      });

      it("counts a low 5 card run", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.CLUBS, Faces.ACE),
            new Card(Suits.HEARTS, Faces.THREE),
            new Card(Suits.SPADES, Faces.FOUR),
            new Card(Suits.CLUBS, Faces.FIVE),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.DIAMONDS, Faces.TWO);

        expect(hand.calculateScore()).toEqual(7); //extra two points because it also adds to 15
      });
    });

    describe("counting flushes", () => {
      it("counts a 4 card flush not in crib", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.CLUBS, Faces.TWO),
            new Card(Suits.CLUBS, Faces.FOUR),
            new Card(Suits.CLUBS, Faces.JACK),
            new Card(Suits.CLUBS, Faces.TEN),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.HEARTS, Faces.KING);

        expect(hand.calculateScore()).toEqual(4);
      });

      it("does not count a 4 card flush in crib", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.CLUBS, Faces.TWO),
            new Card(Suits.CLUBS, Faces.FOUR),
            new Card(Suits.CLUBS, Faces.JACK),
            new Card(Suits.CLUBS, Faces.TEN),
          ],
          Symbol("accessKey"),
          true,
        );
        hand.cutCard = new Card(Suits.HEARTS, Faces.KING);

        expect(hand.calculateScore()).toEqual(0);
      });

      it("counts a 5 card flush not in crib", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.CLUBS, Faces.TWO),
            new Card(Suits.CLUBS, Faces.FOUR),
            new Card(Suits.CLUBS, Faces.QUEEN),
            new Card(Suits.CLUBS, Faces.TEN),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.CLUBS, Faces.KING);

        expect(hand.calculateScore()).toEqual(5);
      });

      it("counts a 5 card flush in crib", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.CLUBS, Faces.TWO),
            new Card(Suits.CLUBS, Faces.FOUR),
            new Card(Suits.CLUBS, Faces.QUEEN),
            new Card(Suits.CLUBS, Faces.TEN),
          ],
          Symbol("accessKey"),
          true,
        );
        hand.cutCard = new Card(Suits.CLUBS, Faces.KING);

        expect(hand.calculateScore()).toEqual(5);
      });
    });

    describe("common hand situations", () => {
      it("counts 28 points", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.CLUBS, Faces.FIVE),
            new Card(Suits.DIAMONDS, Faces.FIVE),
            new Card(Suits.SPADES, Faces.FIVE),
            new Card(Suits.CLUBS, Faces.TEN),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.HEARTS, Faces.FIVE);

        expect(hand.calculateScore()).toEqual(28);
      });

      it("counts 29 points", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.HEARTS, Faces.FIVE),
            new Card(Suits.DIAMONDS, Faces.FIVE),
            new Card(Suits.SPADES, Faces.FIVE),
            new Card(Suits.CLUBS, Faces.JACK),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.CLUBS, Faces.FIVE);

        expect(hand.calculateScore()).toEqual(29);
      });

      it("counts straight 8", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.SPADES, Faces.ACE),
            new Card(Suits.SPADES, Faces.TWO),
            new Card(Suits.HEARTS, Faces.ACE),
            new Card(Suits.SPADES, Faces.THREE),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.CLUBS, Faces.SEVEN);

        expect(hand.calculateScore()).toEqual(8);
      });

      it("counts 15 2, 4 and a pair is 6", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.SPADES, Faces.SEVEN),
            new Card(Suits.SPADES, Faces.EIGHT),
            new Card(Suits.HEARTS, Faces.SEVEN),
            new Card(Suits.SPADES, Faces.THREE),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.CLUBS, Faces.KING);

        expect(hand.calculateScore()).toEqual(6);
      });

      it("counts all the straights and 15s", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.SPADES, Faces.SEVEN),
            new Card(Suits.SPADES, Faces.EIGHT),
            new Card(Suits.HEARTS, Faces.SEVEN),
            new Card(Suits.SPADES, Faces.SIX),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.CLUBS, Faces.NINE);

        expect(hand.calculateScore()).toEqual(16);
      });

      it("does not double count same 15 combo", () => {
        const hand = new CribbageHand(
          [
            new Card(Suits.HEARTS, Faces.FIVE),
            new Card(Suits.CLUBS, Faces.TEN),
            new Card(Suits.DIAMONDS, Faces.TWO),
            new Card(Suits.SPADES, Faces.THREE),
          ],
          Symbol("accessKey"),
        );
        hand.cutCard = new Card(Suits.CLUBS, Faces.FIVE);

        expect(hand.calculateScore()).toEqual(10); // Four unique fifteens: 10+5, 2+3+10, 10+5, 5+5+2+3, and a pair of fives
      });
    });
  });

  describe("takeCardAt() method", () => {
    it("removes the right card from the hand", () => {
      const twoOfClubs = new Card(Suits.CLUBS, Faces.TWO);
      const cards = [new Card(Suits.CLUBS, Faces.ACE), twoOfClubs, new Card(Suits.DIAMONDS, Faces.THREE)];
      const hand = new CribbageHand(cards, Symbol("accessKey"));

      const card = hand.takeCardAt(1);

      expect(card).toBe(twoOfClubs);
      expect(hand.size).toEqual(2);
    });

    it("throws an error when the index isn't in the hand", () => {
      const cards = [new Card(Suits.DIAMONDS, Faces.ACE)];
      const hand = new CribbageHand(cards, Symbol("accessKey"));

      expect(() => hand.takeCardAt(1)).toThrow("Invalid index, hand only has 1 cards");
    });
  });
});

describe("CribbagePlayer", () => {
  describe("constructor", () => {
    it("uses defaults when no arguments are passed", () => {
      const cards = [
        new Card(Suits.HEARTS, Faces.TWO),
        new Card(Suits.DIAMONDS, Faces.FIVE),
        new Card(Suits.CLUBS, Faces.SEVEN),
        new Card(Suits.HEARTS, Faces.SEVEN),
      ];
      const player = new CribbagePlayer();
      player.acceptCards(cards);

      expect(player.hand).toBeTruthy();
    });
  });

  describe("scoreHand method", () => {
    it("increments score", () => {
      const cards = [
        new Card(Suits.HEARTS, Faces.TWO),
        new Card(Suits.DIAMONDS, Faces.FIVE),
        new Card(Suits.CLUBS, Faces.SEVEN),
        new Card(Suits.HEARTS, Faces.SEVEN),
      ];
      const player = new CribbagePlayer();
      player.acceptCards(cards);

      player.scoreHand();

      expect(player.score).toEqual(2);
    });
  });

  describe("discardToCrib method", () => {
    const eightOfSpades = new Card(Suits.SPADES, Faces.EIGHT);
    const eightOfClubs = new Card(Suits.CLUBS, Faces.EIGHT);

    it("discards the right cards to crib", () => {
      const cards = [
        eightOfSpades,
        new Card(Suits.CLUBS, Faces.JACK),
        eightOfClubs,
        new Card(Suits.HEARTS, Faces.FIVE),
        new Card(Suits.SPADES, Faces.TEN),
        new Card(Suits.DIAMONDS, Faces.JACK),
      ];
      const player = new CribbagePlayer(true);
      player.acceptCards(cards);

      const cribCards = player.discardToCrib();

      expect(cribCards).toEqual([eightOfSpades, eightOfClubs]);
    });

    it("discards the right cards when there is a tie", () => {
      const nineOfHearts = new Card(Suits.HEARTS, Faces.NINE);
      const nineOfDiamonds = new Card(Suits.DIAMONDS, Faces.NINE);
      const cards = [
        new Card(Suits.HEARTS, Faces.FIVE),
        new Card(Suits.DIAMONDS, Faces.FIVE),
        new Card(Suits.CLUBS, Faces.SEVEN),
        new Card(Suits.SPADES, Faces.SEVEN),
        nineOfHearts,
        nineOfDiamonds,
      ];
      const player = new CribbagePlayer(true);
      player.acceptCards(cards);

      const cribCards = player.discardToCrib();

      expect(cribCards).toEqual([nineOfHearts, nineOfDiamonds]);
    });

    it("handles a flush trade-off", () => {
      const eight = new Card(Suits.SPADES, Faces.EIGHT);
      const nine = new Card(Suits.CLUBS, Faces.NINE);
      const cards = [
        new Card(Suits.HEARTS, Faces.FOUR),
        new Card(Suits.HEARTS, Faces.FIVE),
        new Card(Suits.HEARTS, Faces.SIX),
        new Card(Suits.HEARTS, Faces.SEVEN),
        eight,
        nine,
      ];
      const player = new CribbagePlayer(true);
      player.acceptCards(cards);

      const cribCards = player.discardToCrib();

      expect(cribCards).toEqual([eight, nine]);
    });

    it("handles multiple 15s with or without pairs", () => {
      const four = new Card(Suits.HEARTS, Faces.FOUR);
      const ace = new Card(Suits.CLUBS, Faces.ACE);
      const cards = [
        new Card(Suits.HEARTS, Faces.FIVE),
        new Card(Suits.DIAMONDS, Faces.FIVE),
        new Card(Suits.CLUBS, Faces.TEN),
        new Card(Suits.SPADES, Faces.KING),
        four,
        ace,
      ];
      const player = new CribbagePlayer(true);
      player.acceptCards(cards);

      const cribCards = player.discardToCrib();

      expect(cribCards).toEqual([four, ace]);
    });

    it("handles multiple 15s with straights", () => {
      const ten = new Card(Suits.HEARTS, Faces.TEN);
      const king = new Card(Suits.SPADES, Faces.KING);
      const cards = [
        new Card(Suits.HEARTS, Faces.FOUR),
        new Card(Suits.SPADES, Faces.FIVE),
        new Card(Suits.DIAMONDS, Faces.SIX),
        new Card(Suits.CLUBS, Faces.FIVE),
        ten,
        king,
      ];
      const player = new CribbagePlayer(true);
      player.acceptCards(cards);

      const cribCards = player.discardToCrib();

      expect(cribCards).toEqual([ten, king]);
    });

    it("throws an error if the player is not a computer and no indexes are passed", () => {
      const player = new CribbagePlayer();

      expect(() => player.discardToCrib()).toThrow("Must pass indexes for human player");
    });

    it("throws an error if the player is not a computer and only index1 is passed", () => {
      const player = new CribbagePlayer();

      expect(() => player.discardToCrib(1)).toThrow("Must pass indexes for human player");
    });

    it("throws an error if the player is not a computer and only index2 is passed", () => {
      const player = new CribbagePlayer();

      expect(() => player.discardToCrib(undefined, 1)).toThrow("Must pass indexes for human player");
    });

    it("removes cards when human player passes small index first", () => {
      const twoOfSpades = new Card(Suits.SPADES, Faces.TWO);
      const threeOfClubs = new Card(Suits.CLUBS, Faces.THREE);
      const player = new CribbagePlayer();
      player.acceptCards([twoOfSpades, threeOfClubs]);

      const cards = player.discardToCrib(0, 1);

      expect(cards).toEqual([threeOfClubs, twoOfSpades]);
      expect(player.hand.size).toEqual(0);
    });

    it("removes cards when human player passes large index first", () => {
      const twoOfSpades = new Card(Suits.SPADES, Faces.TWO);
      const threeOfClubs = new Card(Suits.CLUBS, Faces.THREE);
      const player = new CribbagePlayer();
      player.acceptCards([twoOfSpades, threeOfClubs]);

      const cards = player.discardToCrib(1, 0);

      expect(cards).toEqual([threeOfClubs, twoOfSpades]);
      expect(player.hand.size).toEqual(0);
    });

    it("should throw an error if user passes the same index twice", () => {
      const player = new CribbagePlayer();

      expect(() => player.discardToCrib(0, 0)).toThrow("Cannot pass the same index twice");
    });
  });

  describe("takeCutCard method", () => {
    it("adds the cut card into the hand", () => {
      const cutCard = new Card(Suits.HEARTS, Faces.TWO);
      const player = new CribbagePlayer();
      player.acceptCards([]);

      player.takeCutCard(cutCard);

      expect(player.hand.cutCard).toBe(cutCard);
    });

    it("throws an error if there is no current hand", () => {
      const player = new CribbagePlayer();
      const cutCard = new Card(Suits.CLUBS, Faces.ACE);

      expect(player.takeCutCard.bind(cutCard)).toThrow("No current hand assigned");
    });
  });
});

describe("CribbageGame", () => {
  let game: CribbageGame;
  beforeEach(() => {
    game = new CribbageGame();
    game.startGame();
  });

  describe("startGame method", () => {
    it("starts a game", () => {
      expect(game.player).toBeDefined();
      expect(game.computer).toBeDefined();
    });
  });

  describe("isOver property", () => {
    it("returns true if the player has a score over 120 points", () => {
      Object.defineProperty(game.player, "score", {
        get: jest.fn(() => 121),
      });

      expect(game.isOver).toEqual(true);
    });

    it("returns true if the computer has a score over 120 points", () => {
      Object.defineProperty(game.computer, "score", {
        get: jest.fn(() => 121),
      });

      expect(game.isOver).toEqual(true);
    });

    it("returns false if the player and computer are both 120 or below", () => {
      Object.defineProperty(game.player, "score", {
        get: jest.fn(() => 120),
      });
      Object.defineProperty(game.computer, "score", {
        get: jest.fn(() => 120),
      });

      expect(game.isOver).toBe(false);
    });

    it("throws an error if both players are over 120", () => {
      Object.defineProperty(game.player, "score", {
        get: jest.fn(() => 121),
      });
      Object.defineProperty(game.computer, "score", {
        get: jest.fn(() => 121),
      });

      expect(() => game.isOver).toThrow("Both players cannot win");
    });

    it("throws an error if player is not defined", () => {
      Object.defineProperty(game, "player", {
        get: undefined,
      });

      expect(() => game.isOver).toThrow("Looks like we're missing a player");
    });

    it("throws an error if computer is not defined", () => {
      Object.defineProperty(game, "computer", {
        get: undefined,
      });

      expect(() => game.isOver).toThrow("Looks like we're missing a player");
    });
  });

  describe("dealHand method", () => {
    it("deals the player 6 cards", () => {
      const game = new CribbageGame();
      game.startGame();

      game.dealHand();

      expect(game.player.hand?.size).toEqual(6);
    });

    it("deals the computer 6 cards", () => {
      const game = new CribbageGame();
      game.startGame();

      game.dealHand();

      expect(game.computer.hand?.size).toEqual(6);
    });
  });

  describe("crib handling", () => {
    it("has a property to fetch the crib", () => {
      expect(game.crib).toEqual([]);
    });

    it("has a method to add cards to the crib", () => {
      game.putInCrib([new Card(Suits.DIAMONDS, Faces.TWO)]);

      expect(game.crib.length).toEqual(1);
    });

    it("has a method to clear the crib", () => {
      game.putInCrib([new Card(Suits.CLUBS, Faces.KING)]);

      game.clearCrib();

      expect(game.crib).toEqual([]);
    });
  });
});
