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
var aces_high_core_1 = require("aces-high-core");
var src_1 = require("./src");
var StopWatch = (function () {
    function StopWatch() {
    }
    StopWatch.prototype.start = function () {
        this._start = Date.now();
        return this;
    };
    StopWatch.prototype.stop = function () {
        this._stop = Date.now();
    };
    StopWatch.prototype.displayElapsed = function () {
        console.log("Start-".concat(this._start, " : Stop-").concat(this._stop, " : Difference-").concat((this._stop - this._start) / 1000, "-seconds"));
    };
    return StopWatch;
}());
var scores = __spreadArray([], __read(Array(30)), false).map(function () { return 0; });
var stopwatch = new StopWatch().start();
var totalIterations = 100000;
var roundTo = function (value, decimalPlaces) {
    if (decimalPlaces === void 0) { decimalPlaces = 2; }
    var tens = Math.pow(10, decimalPlaces);
    return Math.round(value * tens) / tens;
};
var calculatePercentage = function (value, total) {
    return roundTo((value / total) * 100, 3);
};
var _loop_1 = function (i) {
    var deck = new aces_high_core_1.StandardDeck();
    deck.fullShuffle();
    var cards = [];
    [0, 0, 0, 0].forEach(function () {
        cards.push(deck.dealCard());
    });
    var hand = new src_1.CribbageHand(cards);
    hand.CutCard = deck.dealCard();
    var score = hand.scoreHand();
    scores[score] += 1;
    if ([28, 29].some(function (val) { return val == score; })) {
        console.log('Found max hand');
    }
};
for (var i = 0; i < totalIterations; i++) {
    _loop_1(i);
}
stopwatch.stop();
for (var i in scores) {
    console.log("".concat(i, ": ").concat(scores[i], ": ").concat(calculatePercentage(scores[i], totalIterations), "%"));
}
stopwatch.displayElapsed();
//# sourceMappingURL=testing.js.map