export function charToDigit(ch) {
    const c = ch.toUpperCase();
    if (c >= "0" && c <= "9") return c.charCodeAt(0) - 48;
    if (c >= "A" && c <= "F") return c.charCodeAt(0) - 55;
    throw new Error(`Neplatná cifra '${ch}'`);
}

export function digitToChar(d) {
    if (d >= 0 && d <= 9) return String.fromCharCode(48 + d);
    if (d >= 10 && d <= 15) return String.fromCharCode(55 + d);
    throw new Error(`digitToChar: číslo mimo rozsahu`);
}

export function toDecimal(numString, base) {
    let result = 0;
    const s = numString.trim().toUpperCase();

    for (let ch of s) {
        const digit = charToDigit(ch);
        if (digit >= base) {
            throw new Error(`Cifra '${ch}' nie je platná v sústave ${base}`);
        }
        result = result * base + digit;
    }

    return result;
}

export function fromDecimal(decimalValue, base) {
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
