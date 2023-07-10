"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.CribbagePlayer = exports.CribbageHand = void 0;
var aces_high_core_1 = require("aces-high-core");
var ArrayItem = (function () {
    function ArrayItem(value) {
        this.value = value;
    }
    return ArrayItem;
}());
function getCombinations(items, itemCount) {
    var combinations = [];
    function generateCombinations(count, start, combo) {
        count--;
        for (var i = start; i < items.length; i++) {
            combo[count] = new ArrayItem(items[i]);
            if (count == 0) {
                combinations.push(combo
                    .map(function (i) { return i.value; }));
            }
            else {
                start++;
                generateCombinations(count, start, combo);
            }
        }
    }
    generateCombinations(itemCount, 0, []);
    return combinations;
}
var CribbageHand = (function (_super) {
    __extends(CribbageHand, _super);
    function CribbageHand(cards, isCrib) {
        if (isCrib === void 0) { isCrib = false; }
        var _this = _super.call(this, cards) || this;
        _this.isCrib = isCrib;
        return _this;
    }
    Object.defineProperty(CribbageHand.prototype, "CutCard", {
        set: function (value) {
            this.cutCard = value;
        },
        enumerable: false,
        configurable: true
    });
    CribbageHand.prototype.getScore = function () {
        var runCounts = { 3: 0, 4: 0, 5: 0 };
        var score = 0;
        score += this.countNobs();
        score += this.countFlush();
        var tempCards = this.Cards.concat([this.cutCard]);
        var values = tempCards.map(function (c) { return c.face; });
        for (var i = 2; i <= tempCards.length; i++) {
            var combos = getCombinations(values, i);
            score += this.countFifteens(tempCards, i);
            if (i == 2) {
                score += this.countSets(combos);
            }
            else {
                var runs = combos.filter(function (c) { return (Math.max.apply(Math, __spreadArray([], __read(c), false)) - Math.min.apply(Math, __spreadArray([], __read(c), false)) + 1) == c.length && c.length == new Set(c).size; });
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
        if (!!this.cutCard && this.Cards.some(function (card) { return card.suit == _this.cutCard.suit && card.face == aces_high_core_1.Faces.JACK; })) {
            return 1;
        }
        return 0;
    };
    CribbageHand.prototype.countFifteens = function (tempCards, comboSize) {
        var sumValues = tempCards.map(function (c) { return c.face >= 10 ? 10 : c.face; });
        var sumCombos = getCombinations(sumValues, comboSize);
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
        combos.forEach(function (c) {
            if (c[0] == c[1])
                score += 2;
        });
        return score;
    };
    CribbageHand.prototype.countFlush = function () {
        var suits = new Set(this.Cards.map(function (c) { return c.suit; }));
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
}(aces_high_core_1.CardHand));
exports.CribbageHand = CribbageHand;
var CribbagePlayer = (function (_super) {
    __extends(CribbagePlayer, _super);
    function CribbagePlayer(hand, isComputer) {
        if (hand === void 0) { hand = null; }
        if (isComputer === void 0) { isComputer = false; }
        var _this = _super.call(this, hand !== null && hand !== void 0 ? hand : new CribbageHand([])) || this;
        _this.isComputer = isComputer;
        _this.score = 0;
        return _this;
    }
    Object.defineProperty(CribbagePlayer.prototype, "Score", {
        get: function () {
            return this.score;
        },
        enumerable: false,
        configurable: true
    });
    CribbagePlayer.prototype.scoreHand = function () {
        this.score += this.Hand.getScore();
    };
    CribbagePlayer.prototype.compPassToCrib = function () {
        return [null, null];
    };
    return CribbagePlayer;
}(aces_high_core_1.CardPlayer));
exports.CribbagePlayer = CribbagePlayer;
//# sourceMappingURL=index.js.map