import { CribbageGame } from "./src";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// add as method to either game or player (or both)
const displayPlayerHand = () => {
  game.player.hand.cards.forEach((card, index) => {
    console.log(`${index} - ${card.toString()}`);
  });
};

const game = new CribbageGame();
game.startGame();

game.dealHand();

game.putInCrib(game.computer.discardToCrib());

displayPlayerHand();

rl.question("What is the index of the first card you'd like to put in the crib?", (answer) => {
  const index = parseInt(answer.trimEnd());
  // move splice logic to game or player object (or both)
  const cards = game.player.hand.cards.splice(index, 1);
  game.putInCrib(cards);
  displayPlayerHand();
  rl.question("What is the index of the second card you'd like ot put in the crib?", (answer) => {
    const index = parseInt(answer.trimEnd());
    // move splice logic to game or player object (or both)
    const cards = game.player.hand.cards.splice(index, 1);
    game.putInCrib(cards);

    displayPlayerHand();
    console.log(game.crib);
    rl.close();
  });
});
