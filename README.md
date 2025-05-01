# Aces High Cribbage

Aces High Cribbage is a TypeScript-based game engine for Cribbage, designed to simulate the scoring and gameplay mechanics of the classic card game. Built on top of the [Aces High Core](https://github.com/asmitty92/aces-high-core) library, this engine provides accurate implementation of Cribbage rules, including scoring, hand evaluation, and gameplay logic.

## Features

- **Rule-Based Scoring**:
  - Supports Nobs, fifteens, sets, runs, flushes, and other scoring combinations.
  - Handles complex hand and crib scoring scenarios.

- **Gameplay Mechanics**:
  - Implements cut card logic and crib-specific rules.
  - Provides utilities for managing players' hands and the crib.

- **Reusable Design**:
  - Modular architecture for integration with CLI, web, or mobile UIs.
  - Extendable for custom Cribbage variants.

- **TypeScript Support**:
  - Fully written in TypeScript for modern, type-safe development.

## Installation

To install the engine, use npm or yarn:

```bash
npm install aces-high-cribbage
```

or

```bash
yarn add aces-high-cribbage
```

## Getting Started

Here’s a quick example of how to use Aces High Cribbage to evaluate a hand’s score:

```typescript
import { CribbageHand, Card, Suits, Faces } from 'aces-high-cribbage';

// Create a Cribbage hand
const hand = new CribbageHand([
  new Card(Suits.HEARTS, Faces.FIVE),
  new Card(Suits.CLUBS, Faces.FIVE),
  new Card(Suits.DIAMONDS, Faces.FIVE),
  new Card(Suits.SPADES, Faces.JACK),
]);

// Set the cut card
hand.cutCard = new Card(Suits.CLUBS, Faces.FIVE);

// Calculate the score
const score = hand.calculateScore();
console.log('Hand score:', score); // Output: 29 (highest possible Cribbage hand score)
```

## Development

This repository is still under active development. Below are some key areas:

- **Core Scoring Logic**: Fully implemented and tested.
- **Gameplay Logic**: Currently focused on hand and crib scoring.
- **Future Plans**: Adding pegging mechanics and AI for automated gameplay.

## Roadmap

- Integrate with a UI for interactive gameplay.
- Add support for pegging mechanics.
- Create AI opponents with varying skill levels.
- Expand test coverage for edge cases and gameplay scenarios.

## Contributing

We welcome contributions! To get started:

1. Fork this repository.
2. Clone your fork and install dependencies:
   ```bash
   git clone https://github.com/YOUR_USERNAME/aces-high-cribbage.git
   cd aces-high-cribbage
   npm install
   ```
3. Make your changes and ensure all tests pass:
   ```bash
   npm test
   ```
4. Submit a pull request with a clear description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Related Projects

- [Aces High Core](https://github.com/asmitty92/aces-high-core): The foundational library for card game engines.
- [Aces High Poker](https://github.com/asmitty92/aces-high-poker): A Poker game engine utilizing Aces High Core.

## Contact

For questions or suggestions, feel free to open an issue or contact [@asmitty92](https://github.com/asmitty92) directly.