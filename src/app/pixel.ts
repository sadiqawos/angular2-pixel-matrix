import { RGBValue } from './rgb';
export class Pixel {
    isActive = '0';
    color: RGBValue;

    constructor(color?:RGBValue) {
        if (!color)
        {
            this.color = new RGBValue(0, 0, 0);
            //this.color = new RGBValue(255, 255, 255);
        }
    }
}
