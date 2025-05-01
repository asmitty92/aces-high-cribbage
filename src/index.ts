import { CardHand, Card, CardPlayer, StandardDeck, getCombinations, Faces } from "aces-high-core";

export class CribbageHand extends CardHand {
  protected myCutCard: Card;

  get cutCard(): Card {
    return this.myCutCard;
  }

  set cutCard(value: Card) {
    this.myCutCard = value;
  }

  get size(): number {
    return this.cards.length;
  }

  constructor(
    cards: Array<Card>,
    private isCrib: boolean = false,
  ) {
    super(cards);
  }

  calculateScore(): number {
    const runCounts: Record<number, number> = { 3: 0, 4: 0, 5: 0 };
    let score = 0;

    score += this.countNobs();
    score += this.countFlush();

    const tempCards = this.cutCard ? this.cards.concat([this.cutCard]) : [...this.cards];
    const values = tempCards.map((c) => c.value);

    for (let i = 2; i <= tempCards.length; i++) {
      const combos = getCombinations(values, i);
      score += this.countFifteens(tempCards, i);

      if (i == 2) {
        score += this.countSets(combos);
      } else {
        const runs = combos.filter(
          (c) => Math.max(...c) - Math.min(...c) + 1 == c.length && c.length == new Set(c).size,
        );
        score += runs.length * i;
        runCounts[i] = runs.length;
        if (i > 3 && runs.length > 0) {
          score -= runCounts[i - 1] * (i - 1);
        }
      }
    }

    return score;
  }

  takeCardAt(index: number): Card {
    if (index >= this.cards.length) {
      throw new Error(`Invalid index, hand only has ${this.cards.length} cards`);
    }

    return this.cards.splice(index, 1)[0];
  }

  private countNobs(): number {
    if (!!this.cutCard && this.cards.some((card) => card.suit == this.cutCard.suit && card.face == Faces.JACK)) {
      return 1;
    }
    return 0;
  }

  private countFifteens(tempCards: Card[], comboSize: number): number {
    const sumValues = tempCards.map((c) => (c.value >= 10 ? 10 : c.value));
    const sumCombos = getCombinations(sumValues, comboSize);
    let score = 0;
    sumCombos.forEach((c) => {
      const sum = <number>c.reduce((i1, i2) => i1 + i2);
      if (sum == 15) score += 2;
    });
    return score;
  }

  private countSets(combos: Array<Array<number>>): number {
    let score = 0;
    combos.forEach((c) => {
      if (c[0] == c[1]) score += 2;
    });
    return score;
  }

  private countFlush(): number {
    const suits = new Set(this.cards.map((c) => c.suit));
    if (suits.size == 1) {
      if (!!this.cutCard && suits.has(this.cutCard.suit)) {
        return 5;
      } else {
        return this.isCrib ? 0 : 4;
      }
    }
    return 0;
  }
}


export class CribbagePlayer extends CardPlayer {
  protected isComputer: boolean;
  protected currentHand: CribbageHand;

  get score(): number {
    return this.myScore;
  }

  get hand(): CribbageHand {
    return this.currentHand;
  }

  constructor(isComputer: boolean = false) {
    super();
    this.isComputer = isComputer;
    this.myScore = 0;
  }

  takeCards(cards: Card[]): void {
    this.currentHand = new CribbageHand(cards);
  }

  takeCutCard(card: Card): void {
    if (!this.currentHand) {
      throw new Error("No current hand assigned");
    }

    this.currentHand.cutCard = card;
  }

  scoreHand(): void {
    this.myScore += this.hand.calculateScore();
  }

  discardToCrib = (index1: number = undefined, index2: number = undefined) => {
    this.validateIndices(index1, index2);

    if (this.isComputer) {
      return this.compDiscardToCrib();
    }

    // we always want to return the card at the higher index first to avoid shifting the list and making the higher index invalid
    if (index1 > index2) {
      return [this.hand.takeCardAt(index1), this.hand.takeCardAt(index2)];
    }
    return [this.hand.takeCardAt(index2), this.hand.takeCardAt(index1)];
  };

  protected validateIndices = (index1: number, index2: number) => {
    if ((index1 == null || index2 == null) && !this.isComputer) {
      throw new Error("Must pass indexes for human player");
    }
    if (index1 != null && index2 != null && index1 === index2) {
      throw new Error("Cannot pass the same index twice");
    }
  };

  protected compDiscardToCrib(): Card[] {
    const combinations = getCombinations(this.hand.cards, 4);
    let maxScore = 0;
    let maxHand = undefined as CribbageHand;
    for (const combo of combinations) {
      const hand = new CribbageHand(combo);
      hand.cutCard = (this.hand as CribbageHand).cutCard;
      const score = hand.calculateScore();
      if (score > maxScore) {
        maxScore = score;
        maxHand = hand;
      }
    }
    const [card1, card2] = this.hand.cards.filter((card) => !maxHand.cards.includes(card));
    this.currentHand = maxHand;
    return [card1, card2];
  }
}

export class CribbageGame {
  protected myPlayer: CribbagePlayer;
  protected myComputer: CribbagePlayer;
  protected myDeck: StandardDeck;
  protected _crib: Card[] = [];

  get player(): CribbagePlayer {
    return this.myPlayer;
  }

  get computer(): CribbagePlayer {
    return this.myComputer;
  }

  get isOver(): boolean {
    if (!this.player || !this.computer) {
      throw new Error("Looks like we're missing a player");
    }

    if (this.player.score > 120 && this.computer.score > 120) {
      throw new Error("Both players cannot win");
    }

    return this.player.score > 120 || this.computer.score > 120;
  }

  get crib(): Card[] {
    return this._crib;
  }

  constructor() {}

  startGame: VoidFunction = () => {
    this.myPlayer = new CribbagePlayer();
    this.myComputer = new CribbagePlayer(true);
    this.myDeck = new StandardDeck();
  };

  dealHand: VoidFunction = () => {
    this.myDeck.fullShuffle();
    const playerCards = [];
    const computerCards = [];
    while (playerCards.length !== 6) {
      playerCards.push(this.myDeck.deal(), this.myDeck.deal());
      computerCards.push(this.myDeck.deal(), this.myDeck.deal());
    }
    this.computer.takeCards(computerCards);
    this.player.takeCards(playerCards);
  };

  putInCrib = (cards: Card[]): void => {
    this.crib.push(...cards);
  };

  clearCrib: VoidFunction = () => {
    this._crib.length = 0;
  };
}
