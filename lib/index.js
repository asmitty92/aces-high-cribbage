"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CribbageHand = void 0;
var aces_high_core_1 = require("aces-high-core");
var ArrayItem = (function () {
    function ArrayItem(value) {
        this.value = value;
    }
    return ArrayItem;
}());
var Combinations = (function () {
    function Combinations(items, itemCount) {
        this.combinations = [];
        this.items = items;
        this.generate(itemCount, 0, []);
    }
    Object.defineProperty(Combinations.prototype, "Combinations", {
        get: function () {
            return this.combinations;
        },
        enumerable: false,
        configurable: true
    });
    Combinations.prototype.generate = function (itemCount, start, combo) {
        itemCount--;
        for (var i = start; i < this.items.length; i++) {
            combo[itemCount] = new ArrayItem(this.items[i]);
            if (itemCount == 0) {
                this.combinations.push(combo
                    .map(function (i) { return i.value; }));
            }
            else {
                start++;
                this.generate(itemCount, start, combo);
            }
        }
    };
    return Combinations;
}());
var CribbageHand = (function () {
    function CribbageHand(cards) {
        this.cards = cards;
    }
    Object.defineProperty(CribbageHand.prototype, "Cards", {
        get: function () {
            return this.cards;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CribbageHand.prototype, "CutCard", {
        set: function (value) {
            this.cutCard = value;
        },
        enumerable: false,
        configurable: true
    });
    CribbageHand.prototype.scoreHand = function () {
        var _this = this;
        var score = 0;
        if (!!this.cutCard && this.cards.some(function (card) { return card.suit == _this.cutCard.suit && card.face == aces_high_core_1.Faces.JACK; })) {
            score += 1;
        }
        var tempCards = this.cards.concat([this.cutCard]);
        var combos = new Combinations(tempCards, 2).Combinations;
        return score;
    };
    CribbageHand.prototype.getCombos = function (items) {
        var result = [];
        result.push([]);
        result.at(-1).push(items[0]);
        if (items.length == 1)
            return result;
        var tailCombos = this.getCombos(items.slice(1));
        for (var _i = 0, tailCombos_1 = tailCombos; _i < tailCombos_1.length; _i++) {
            var combo = tailCombos_1[_i];
            result.push(combo);
        }
        return result;
    };
    return CribbageHand;
}());
exports.CribbageHand = CribbageHand;
var combos = new Combinations([
    new aces_high_core_1.Card(aces_high_core_1.Suits.CLUBS, aces_high_core_1.Faces.TWO),
    new aces_high_core_1.Card(aces_high_core_1.Suits.CLUBS, aces_high_core_1.Faces.FOUR),
    new aces_high_core_1.Card(aces_high_core_1.Suits.CLUBS, aces_high_core_1.Faces.SIX),
    new aces_high_core_1.Card(aces_high_core_1.Suits.CLUBS, aces_high_core_1.Faces.EIGHT),
    new aces_high_core_1.Card(aces_high_core_1.Suits.CLUBS, aces_high_core_1.Faces.TEN)
], 2);
console.log(combos.Combinations);
//# sourceMappingURL=index.js.map