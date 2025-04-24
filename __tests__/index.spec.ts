import { Card, Faces, Suits } from "aces-high-core";
import { CribbageHand, CribbagePlayer, CribbageGame } from "../src";

describe("CribbageHand", () => {
  describe("calculateScore() method", () => {
    describe("counting his nobs", () => {
      it("counts his nobs", () => {
        const hand = new CribbageHand([
          new Card(Suits.HEARTS, Faces.TWO),
          new Card(Suits.CLUBS, Faces.EIGHT),
          new Card(Suits.DIAMONDS, Faces.FOUR),
          new Card(Suits.SPADES, Faces.JACK),
        ]);
        hand.cutCard = new Card(Suits.SPADES, Faces.TEN);

        expect(hand.calculateScore()).toEqual(1);
      });

      it("does not count his nobs when suits don't match", () => {
        const hand = new CribbageHand([
          new Card(Suits.HEARTS, Faces.TWO),
          new Card(Suits.CLUBS, Faces.EIGHT),
          new Card(Suits.DIAMONDS, Faces.SIX),
          new Card(Suits.SPADES, Faces.JACK), // Not matching cut card suit
        ]);
        hand.cutCard = new Card(Suits.CLUBS, Faces.FOUR);

        expect(hand.calculateScore()).toEqual(0);
      });
    });

    describe("counting sets", () => {
      it("counts one set", () => {
        const hand = new CribbageHand([
          new Card(Suits.CLUBS, Faces.EIGHT),
          new Card(Suits.CLUBS, Faces.QUEEN),
          new Card(Suits.SPADES, Faces.EIGHT),
          new Card(Suits.CLUBS, Faces.TWO),
        ]);
        hand.cutCard = new Card(Suits.HEARTS, Faces.KING);

        expect(hand.calculateScore()).toEqual(2);
      });

      it("counts two sets", () => {
        const hand = new CribbageHand([
          new Card(Suits.CLUBS, Faces.EIGHT),
          new Card(Suits.CLUBS, Faces.QUEEN),
          new Card(Suits.SPADES, Faces.EIGHT),
          new Card(Suits.CLUBS, Faces.TWO),
        ]);
        hand.cutCard = new Card(Suits.HEARTS, Faces.QUEEN);

        expect(hand.calculateScore()).toEqual(4);
      });

      it("counts a set of 3", () => {
        const hand = new CribbageHand([
          new Card(Suits.CLUBS, Faces.EIGHT),
          new Card(Suits.CLUBS, Faces.QUEEN),
          new Card(Suits.SPADES, Faces.EIGHT),
          new Card(Suits.CLUBS, Faces.TWO),
        ]);
        hand.cutCard = new Card(Suits.HEARTS, Faces.EIGHT);

        expect(hand.calculateScore()).toEqual(6);
      });

      it("counts a set of 4", () => {
        const hand = new CribbageHand([
          new Card(Suits.CLUBS, Faces.EIGHT),
          new Card(Suits.CLUBS, Faces.QUEEN),
          new Card(Suits.SPADES, Faces.EIGHT),
          new Card(Suits.DIAMONDS, Faces.EIGHT),
        ]);
        hand.cutCard = new Card(Suits.HEARTS, Faces.EIGHT);

        expect(hand.calculateScore()).toEqual(12);
      });

      it("counts a set of 3 and a set of 2", () => {
        const hand = new CribbageHand([
          new Card(Suits.CLUBS, Faces.EIGHT),
          new Card(Suits.CLUBS, Faces.QUEEN),
          new Card(Suits.SPADES, Faces.EIGHT),
          new Card(Suits.SPADES, Faces.QUEEN),
        ]);
        hand.cutCard = new Card(Suits.HEARTS, Faces.EIGHT);

        expect(hand.calculateScore()).toEqual(8);
      });
    });

    describe("counting fifteens", () => {
      it("counts a 2 card 15", () => {
        const hand = new CribbageHand([
          new Card(Suits.HEARTS, Faces.TWO),
          new Card(Suits.CLUBS, Faces.EIGHT),
          new Card(Suits.DIAMONDS, Faces.SEVEN),
          new Card(Suits.SPADES, Faces.FOUR),
        ]);
        hand.cutCard = new Card(Suits.SPADES, Faces.TEN);

        expect(hand.calculateScore()).toEqual(2);
      });

      it("counts a 3 card 15", () => {
        const hand = new CribbageHand([
          new Card(Suits.HEARTS, Faces.THREE),
          new Card(Suits.CLUBS, Faces.EIGHT),
          new Card(Suits.DIAMONDS, Faces.JACK),
          new Card(Suits.SPADES, Faces.FOUR),
        ]);
        hand.cutCard = new Card(Suits.SPADES, Faces.TEN);

        expect(hand.calculateScore()).toEqual(2);
      });

      it("counts a 4 card 15", () => {
        const hand = new CribbageHand([
          new Card(Suits.HEARTS, Faces.ACE),
          new Card(Suits.CLUBS, Faces.THREE),
          new Card(Suits.DIAMONDS, Faces.NINE),
          new Card(Suits.SPADES, Faces.FOUR),
        ]);
        hand.cutCard = new Card(Suits.SPADES, Faces.SEVEN);

        expect(hand.calculateScore()).toEqual(2);
      });
    });

    describe("counting runs", () => {
      it("counts a 3 card run", () => {
        const hand = new CribbageHand([
          new Card(Suits.CLUBS, Faces.JACK),
          new Card(Suits.HEARTS, Faces.FOUR),
          new Card(Suits.SPADES, Faces.QUEEN),
          new Card(Suits.CLUBS, Faces.TEN),
        ]);
        hand.cutCard = new Card(Suits.DIAMONDS, Faces.TWO);

        expect(hand.calculateScore()).toEqual(3);
      });

      it("counts a triple 3 card run", () => {
        const hand = new CribbageHand([
          new Card(Suits.HEARTS, Faces.THREE),
          new Card(Suits.DIAMONDS, Faces.FOUR),
          new Card(Suits.SPADES, Faces.FIVE),
          new Card(Suits.CLUBS, Faces.THREE),
        ]);
        hand.cutCard = new Card(Suits.HEARTS, Faces.THREE);

        expect(hand.calculateScore()).toEqual(21); // Three 3s = 6 + 3 runs of 3 = 9 + 3 fifteens = 6
      });

      it("counts a 4 card run", () => {
        const hand = new CribbageHand([
          new Card(Suits.CLUBS, Faces.JACK),
          new Card(Suits.HEARTS, Faces.FOUR),
          new Card(Suits.SPADES, Faces.QUEEN),
          new Card(Suits.CLUBS, Faces.TEN),
        ]);
        hand.cutCard = new Card(Suits.DIAMONDS, Faces.KING);

        expect(hand.calculateScore()).toEqual(4);
      });

      it("counts a double 4 card run", () => {
        const hand = new CribbageHand([
          new Card(Suits.HEARTS, Faces.THREE),
          new Card(Suits.DIAMONDS, Faces.FOUR),
          new Card(Suits.SPADES, Faces.FIVE),
          new Card(Suits.CLUBS, Faces.THREE),
        ]);
        hand.cutCard = new Card(Suits.CLUBS, Faces.SIX);

        expect(hand.calculateScore()).toEqual(14); // Two runs of 4 = 8 + pair of 3s = 2 + 2 fifteens = 4
      });

      it("counts a high 5 card run", () => {
        const hand = new CribbageHand([
          new Card(Suits.CLUBS, Faces.JACK),
          new Card(Suits.HEARTS, Faces.NINE),
          new Card(Suits.SPADES, Faces.QUEEN),
          new Card(Suits.CLUBS, Faces.TEN),
        ]);
        hand.cutCard = new Card(Suits.DIAMONDS, Faces.KING);

        expect(hand.calculateScore()).toEqual(5);
      });

      it("counts a low 5 card run", () => {
        const hand = new CribbageHand([
          new Card(Suits.CLUBS, Faces.ACE),
          new Card(Suits.HEARTS, Faces.THREE),
          new Card(Suits.SPADES, Faces.FOUR),
          new Card(Suits.CLUBS, Faces.FIVE),
        ]);
        hand.cutCard = new Card(Suits.DIAMONDS, Faces.TWO);

        expect(hand.calculateScore()).toEqual(7); //extra two points because it also adds to 15
      });
    });

    describe("counting flushes", () => {
      it("counts a 4 card flush not in crib", () => {
        const hand = new CribbageHand([
          new Card(Suits.CLUBS, Faces.TWO),
          new Card(Suits.CLUBS, Faces.FOUR),
          new Card(Suits.CLUBS, Faces.JACK),
          new Card(Suits.CLUBS, Faces.TEN),
        ]);
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
          true,
        );
        hand.cutCard = new Card(Suits.HEARTS, Faces.KING);

        expect(hand.calculateScore()).toEqual(0);
      });

      it("counts a 5 card flush not in crib", () => {
        const hand = new CribbageHand([
          new Card(Suits.CLUBS, Faces.TWO),
          new Card(Suits.CLUBS, Faces.FOUR),
          new Card(Suits.CLUBS, Faces.QUEEN),
          new Card(Suits.CLUBS, Faces.TEN),
        ]);
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
          true,
        );
        hand.cutCard = new Card(Suits.CLUBS, Faces.KING);

        expect(hand.calculateScore()).toEqual(5);
      });
    });

    describe("common hand situations", () => {
      it("counts 28 points", () => {
        const hand = new CribbageHand([
          new Card(Suits.CLUBS, Faces.FIVE),
          new Card(Suits.DIAMONDS, Faces.FIVE),
          new Card(Suits.SPADES, Faces.FIVE),
          new Card(Suits.CLUBS, Faces.TEN),
        ]);
        hand.cutCard = new Card(Suits.HEARTS, Faces.FIVE);

        expect(hand.calculateScore()).toEqual(28);
      });

      it("counts 29 points", () => {
        const hand = new CribbageHand([
          new Card(Suits.HEARTS, Faces.FIVE),
          new Card(Suits.DIAMONDS, Faces.FIVE),
          new Card(Suits.SPADES, Faces.FIVE),
          new Card(Suits.CLUBS, Faces.JACK),
        ]);
        hand.cutCard = new Card(Suits.CLUBS, Faces.FIVE);

        expect(hand.calculateScore()).toEqual(29);
      });

      it("counts straight 8", () => {
        const hand = new CribbageHand([
          new Card(Suits.SPADES, Faces.ACE),
          new Card(Suits.SPADES, Faces.TWO),
          new Card(Suits.HEARTS, Faces.ACE),
          new Card(Suits.SPADES, Faces.THREE),
        ]);
        hand.cutCard = new Card(Suits.CLUBS, Faces.SEVEN);

        expect(hand.calculateScore()).toEqual(8);
      });

      it("counts 15 2, 4 and a pair is 6", () => {
        const hand = new CribbageHand([
          new Card(Suits.SPADES, Faces.SEVEN),
          new Card(Suits.SPADES, Faces.EIGHT),
          new Card(Suits.HEARTS, Faces.SEVEN),
          new Card(Suits.SPADES, Faces.THREE),
        ]);
        hand.cutCard = new Card(Suits.CLUBS, Faces.KING);

        expect(hand.calculateScore()).toEqual(6);
      });

      it("counts all the straights and 15s", () => {
        const hand = new CribbageHand([
          new Card(Suits.SPADES, Faces.SEVEN),
          new Card(Suits.SPADES, Faces.EIGHT),
          new Card(Suits.HEARTS, Faces.SEVEN),
          new Card(Suits.SPADES, Faces.SIX),
        ]);
        hand.cutCard = new Card(Suits.CLUBS, Faces.NINE);

        expect(hand.calculateScore()).toEqual(16);
      });

      it("does not double count same 15 combo", () => {
        const hand = new CribbageHand([
          new Card(Suits.HEARTS, Faces.FIVE),
          new Card(Suits.CLUBS, Faces.TEN),
          new Card(Suits.DIAMONDS, Faces.TWO),
          new Card(Suits.SPADES, Faces.THREE),
        ]);
        hand.cutCard = new Card(Suits.CLUBS, Faces.FIVE);

        expect(hand.calculateScore()).toEqual(10); // Four unique fifteens: 10+5, 2+3+10, 10+5, 5+5+2+3, and a pair of fives
      });
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
      player.takeCards(cards);

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
      player.takeCards(cards);
      player.takeCutCard(new Card(Suits.SPADES, Faces.NINE));

      player.scoreHand();

      expect(player.score).toEqual(2);
    });
  });

  describe("discardToCrib method", () => {
    const eightOfSpades = new Card(Suits.SPADES, Faces.EIGHT);
    const eightOfClubs = new Card(Suits.CLUBS, Faces.EIGHT);

    it("discards the right cards to crib", async () => {
      const cards = [
        eightOfSpades,
        new Card(Suits.CLUBS, Faces.JACK),
        eightOfClubs,
        new Card(Suits.HEARTS, Faces.FIVE),
        new Card(Suits.SPADES, Faces.TEN),
        new Card(Suits.DIAMONDS, Faces.JACK),
      ];
      const player = new CribbagePlayer();
      player.takeCards(cards);
      player.takeCutCard(new Card(Suits.SPADES, Faces.THREE));

      const cribCards = player.discardToCrib();

      expect(cribCards).toEqual([eightOfSpades, eightOfClubs]);
    });

    it("discards the right cards when there is a tie", async () => {
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
      const player = new CribbagePlayer();
      player.takeCards(cards);
      player.takeCutCard(new Card(Suits.CLUBS, Faces.TWO));

      const cribCards = player.discardToCrib();

      expect(cribCards).toEqual([nineOfHearts, nineOfDiamonds]);
    });

    it("handles a flush trade-off", async () => {
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
      const player = new CribbagePlayer();
      player.takeCards(cards);
      player.takeCutCard(new Card(Suits.SPADES, Faces.FOUR));

      const cribCards = player.discardToCrib();

      expect(cribCards).toEqual([eight, nine]);
    });

    it("handles multiple 15s with or without pairs", async () => {
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
      const player = new CribbagePlayer();
      player.takeCards(cards);
      player.takeCutCard(new Card(Suits.CLUBS, Faces.TWO));

      const cribCards = player.discardToCrib();

      expect(cribCards).toEqual([four, ace]);
    });

    it("handles multiple 15s with straights", async () => {
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
      const player = new CribbagePlayer();
      player.takeCards(cards);
      player.takeCutCard(new Card(Suits.CLUBS, Faces.TWO));

      const cribCards = player.discardToCrib();

      expect(cribCards).toEqual([ten, king]);
    });
  });

  describe("takeCutCard method", () => {
    it("adds the cut card into the hand", async () => {
      const cutCard = new Card(Suits.HEARTS, Faces.TWO);
      const player = new CribbagePlayer();
      player.takeCards([]);

      player.takeCutCard(cutCard);

      expect(player.hand.cutCard).toBe(cutCard);
    });

    it("throws an error if there is no current hand", async () => {
      const player = new CribbagePlayer();
      const cutCard = new Card(Suits.CLUBS, Faces.ACE);

      expect(player.takeCutCard.bind(cutCard)).toThrow("No current hand assigned");
    });
  });
});

describe("CribbageGame", () => {
  let game: CribbageGame;
  beforeEach(async () => {
    game = new CribbageGame();
    game.startGame();
  });
  describe("startGame method", () => {
    it("starts a game", async () => {
      expect(game.player).toBeDefined();
      expect(game.computer).toBeDefined();
    });
  });

  describe("isOver property", () => {
    it("returns true if the player has a score over 120 points", async () => {
      Object.defineProperty(game.player, "score", {
        get: jest.fn(() => 121),
      });

      expect(game.isOver).toEqual(true);
    });

    it("returns true if the computer has a score over 120 points", async () => {
      Object.defineProperty(game.computer, "score", {
        get: jest.fn(() => 121),
      });

      expect(game.isOver).toEqual(true);
    });

    it("throws an error if both players are over 120", async () => {
      Object.defineProperty(game.player, "score", {
        get: jest.fn(() => 121),
      });
      Object.defineProperty(game.computer, "score", {
        get: jest.fn(() => 121),
      });

      expect(() => game.isOver).toThrow("Both players cannot win");
    });

    it("throws an error if player is not defined", async () => {
      Object.defineProperty(game, "player", {
        get: undefined,
      });

      expect(() => game.isOver).toThrow("Looks like we're missing a player");
    });

    it("throws an error if computer is not defined", async () => {
      Object.defineProperty(game, "computer", {
        get: undefined,
      });

      expect(() => game.isOver).toThrow("Looks like we're missing a player");
    });
  });
});
