export class ConvertBase {
    static  convertBase(baseFrom, baseTo, num) {
        return parseInt(num, baseFrom).toString(baseTo);
    }

    static bin2dec(num) {
        return this.convertBase(2, 10, num);
    }

    static hex2bin(num) {
        return this.convertBase(16, 2, num);
    }

    static bin2hex(num) {
        return this.convertBase(2, 16, num);
    }

    static dec2bin(num) {
        return this.convertBase(10, 2, num);
    }

    static dec2hex(num) {
        this.convertBase(10, 16, num);
    }

    static hex2dec(num) {
        this.convertBase(16, 10, num);
    }
}