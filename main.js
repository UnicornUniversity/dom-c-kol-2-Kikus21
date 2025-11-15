//TODO add imports if needed
//import { exMain } from "./exclude/exampleAss2.js"

/**
 * Hlavná funkcia aplikácie.
 * Účel: konvertuje číslo zo vstupnej číselnej sústavy do výstupnej číselnej sústavy.
 *
 * @param {string} inputNumber číslo, ktoré sa konvertuje (napr. "1011" alebo "15")
 * @param {number} inputNumberSystem sústava vstupného čísla (napr. 2, 8, 10, 16)
 * @param {number} outputNumberSystem sústava výstupného čísla (napr. 2, 8, 10, 16)
 * @returns {string} číslo skonvertované do cieľovej sústavy
 */
export function main(inputNumber, inputNumberSystem, outputNumberSystem) {
    // validácie
    if (typeof inputNumber !== "string") {
        throw new Error("inputNumber musí byť string");
    }
    if (!permittedInputSystems().includes(inputNumberSystem)) {
        throw new Error(`Vstupná sústava ${inputNumberSystem} nie je povolená.`);
    }
    if (!permittedOutputSystems().includes(outputNumberSystem)) {
        throw new Error(`Výstupná sústava ${outputNumberSystem} nie je povolená.`);
    }

    // 1) konverzia vstupného čísla do desiatkovej sústavy
    const decimalValue = toDecimal(inputNumber, inputNumberSystem);

    // 2) konverzia z desiatkovej sústavy do cieľovej sústavy
    const outputValue = fromDecimal(decimalValue, outputNumberSystem);

    return outputValue;
}

/**
 * Povolené vstupné číselné sústavy.
 */
export function permittedInputSystems() {
    return [2, 8, 10, 16];
}

/**
 * Povolené výstupné číselné sústavy.
 */
export function permittedOutputSystems() {
    return [2, 8, 10, 16];
}

/* -------------------- Pomocné funkcie -------------------- */

/**
 * Premení jeden znak (0-9, A-F) na číslo 0..15.
 */
function charToDigit(ch) {
    if (typeof ch !== "string" || ch.length !== 1) {
        throw new Error("charToDigit: očakáva sa jeden znak");
    }
    const c = ch.toUpperCase();
    if (c >= "0" && c <= "9") return c.charCodeAt(0) - 48;
    if (c >= "A" && c <= "F") return c.charCodeAt(0) - 55; // A -> 10
    throw new Error(`Neplatná cifra: '${ch}'`);
}

/**
 * Premení číslo (0..15) na znak ('0'..'9','A'..'F').
 */
function digitToChar(d) {
    if (d >= 0 && d <= 9) return String.fromCharCode(48 + d);
    if (d >= 10 && d <= 15) return String.fromCharCode(55 + d); // 10->A
    throw new Error("digitToChar: číslo mimo rozsahu 0..15");
}

/**
 * Konverzia čísla z ľubovoľnej sústavy (base) do desiatkovej.
 * Nepoužíva Number.parseInt(number, base) okrem mapovania jednotlivých cifier.
 */
function toDecimal(numString, base) {
    let result = 0;
    const s = numString.trim().toUpperCase();
    if (s.length === 0) throw new Error("Prázdny inputNumber");

    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        const digit = charToDigit(ch);
        if (digit >= base) {
            throw new Error(`Cifra '${ch}' nie je platná v sústave ${base}`);
        }
        result = result * base + digit;
    }

    return result;
}

/**
 * Konverzia desiatkového čísla do ľubovoľnej sústavy (base).
 */
function fromDecimal(decimalValue, base) {
    if (decimalValue === 0) return "0";

    let current = Math.floor(decimalValue);
    let result = "";

    while (current > 0) {
        const remainder = current % base;
        result = digitToChar(remainder) + result;
        current = Math.floor(current / base);
    }

    return result;
}
