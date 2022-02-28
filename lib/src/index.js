"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
    function CribbageHand(cards, isCrib) {
        if (isCrib === void 0) { isCrib = false; }
        this.isCrib = isCrib;
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
        var runCounts = { 3: 0, 4: 0, 5: 0 };
        var score = 0;
        score += this.countNobs();
        score += this.countFlush();
        var tempCards = this.cards.concat([this.cutCard]);
        var values = tempCards.map(function (c) { return c.face; });
        for (var i = 2; i <= tempCards.length; i++) {
            var combos = new Combinations(values, i);
            score += this.countFifteens(tempCards, i);
            if (i == 2) {
                score += this.countSets(combos);
            }
            else {
                var runs = combos.Combinations.filter(function (c) { return (Math.max.apply(Math, __spreadArray([], __read(c), false)) - Math.min.apply(Math, __spreadArray([], __read(c), false)) + 1) == c.length && c.length == new Set(c).size; });
                score += runs.length * i;
                runCounts[i] = runs.length;
                if (i > 3 && runs.length > 0) {
                    score -= runCounts[i - 1] * (i - 1);
                }
            }
        }
        return score;
    };
    CribbageHand.prototype.countNobs = function () {
        var _this = this;
        if (!!this.cutCard && this.cards.some(function (card) { return card.suit == _this.cutCard.suit && card.face == aces_high_core_1.Faces.JACK; })) {
            return 1;
        }
        return 0;
    };
    CribbageHand.prototype.countFifteens = function (tempCards, comboSize) {
        var sumValues = tempCards.map(function (c) { return c.face >= 10 ? 10 : c.face; });
        var sumCombos = new Combinations(sumValues, comboSize).Combinations;
        var score = 0;
        sumCombos.forEach(function (c) {
            var sum = c.reduce(function (i1, i2) { return i1 + i2; });
            if (sum == 15)
                score += 2;
        });
        return score;
    };
    CribbageHand.prototype.countSets = function (combos) {
        var score = 0;
        combos.Combinations.forEach(function (c) {
            if (c[0] == c[1])
                score += 2;
        });
        return score;
    };
    CribbageHand.prototype.countFlush = function () {
        var suits = new Set(this.cards.map(function (c) { return c.suit; }));
        if (suits.size == 1) {
            if (!!this.cutCard && suits.has(this.cutCard.suit)) {
                return 5;
            }
            else {
                return this.isCrib ? 0 : 4;
            }
        }
        return 0;
    };
    return CribbageHand;
}());
exports.CribbageHand = CribbageHand;
//# sourceMappingURL=index.js.map