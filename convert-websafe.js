"use strict";

var TWO_ZI_TABLE = ["zi", // 0
"ip", // 1
"pa", // 2
"at", // 3
"to", // 4
"ok", // 5
"ki", // 6
"in", // 7
"na", // 8
"am", // 9
"me", // A
"et", // B

"izi", // 10
"ipi", // 11
"apa", // 12
"ata", // 13
"oto", // 14
"oko", // 15
"iki", // 16
"ini", // 17
"ana", // 18
"ama", // 19
"eme", // 1A
"ete"];

var HIGHER_ZI_TABLE = [null, // 00
null, // 10
"pazi", // 20
"atzi", // 30
"tozi", // 40
"okezi", // 50
"kizi", // 60
"inzi", // 70
"nazi", // 80
"amezi", // 90
"mezi", // A0
"etzi"];

for (var i = 24; i < 12 * 12; ++i) {
    var higherZi = Math.floor(i / 12);
    var lowerZi = i % 12;

    var entry = HIGHER_ZI_TABLE[higherZi];
    if (lowerZi !== 0) {
        entry += "-" + TWO_ZI_TABLE[lowerZi];
    }
    TWO_ZI_TABLE.push(entry);
};

var CLASS_TABLE = [null, // 12^0
null, // 12^1
"pazit", // 12^2
"atzit", // 12^3
"tozit", // 12^4
"okezit", // 12^5
"kizit", // 12^6
"inzit", // 12^7
"nazit", // 12^8
"amezit", // 12^9
"mezit", // 12^10
"etzit"];

function log(base, num) {
    return Math.log(num) / Math.log(base);
}

var getLeftmostDigit = function getLeftmostDigit(num) {
    var iter = num;
    while (iter > 12) {
        iter = Math.floor(iter / 12);
    }
    return iter;
};

var includes = function includes(array, thing) {
    return array.indexOf(thing) > -1;
};

var consonantAwareConcat = function consonantAwareConcat(a, b) {
    var ARTICULATION_BUDDIES_1 = ["t", "z", "n"];
    var ARTICULATION_BUDDIES_2 = ["m", "p"];
    var safeToConcat = includes(ARTICULATION_BUDDIES_1, a) && includes(ARTICULATION_BUDDIES_1, b) || includes(ARTICULATION_BUDDIES_2, a) && includes(ARTICULATION_BUDDIES_2, b);

    if (safeToConcat) {
        return "" + a + b;
    }

    return a + "e" + b;
};

var fromInteger = function fromInteger(num) {
    if (num >= 0 && num < 12 * 12) {
        return TWO_ZI_TABLE[num];
    } else if (num < Math.pow(12, 12)) {
        var numB12 = num.toString(12);

        var leftmostZi = parseInt(numB12[0], 12);
        var result = CLASS_TABLE[numB12.length - 1];
        // console.log("result", result, leftmostZi)
        if (leftmostZi !== 0) {
            result = consonantAwareConcat(fromInteger(leftmostZi), result);
        }

        var otherZis = parseInt(numB12.slice(1), 12);
        if (otherZis === 0) {
            return result;
        }

        return result + "-" + fromInteger(otherZis);
    }

    return "-";
};
