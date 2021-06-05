function rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

interface Size {
    readonly width: number;
    readonly height: number;
}

class ScaledPoint {
    get x(): number {
        return this._x.valueOf();
    }
    private readonly _x: ScaledNumber;

    get y(): number {
        return this._y.valueOf();
    }
    private readonly _y: ScaledNumber;

    constructor(x: ScaledNumber, y: ScaledNumber) {
        this._x = x;
        this._y = y;
    }

    offset(by: ScaledVector): ScaledPoint {
        return new ScaledPoint(
            this._x.add(by.x),
            this._y.add(by.y)
        )
    }
}

interface ScaledVector {
    readonly x: ScaledNumber;
    readonly y: ScaledNumber;
}

class ScaledNumber {
    private static readonly DEFAULT_SCALE: number = 8;

    public static from(value: number, shift: number = ScaledNumber.DEFAULT_SCALE): ScaledNumber {
        return new ScaledNumber(value << shift, shift);
    }

    public static rand(min: number, max: number, shift: number = ScaledNumber.DEFAULT_SCALE): ScaledNumber {
        return new ScaledNumber(rand(min << shift, max << shift), shift);
    }

    public readonly scaledValue: number;
    private readonly _shift: number;

    public constructor(scaledValue: number, shift: number = ScaledNumber.DEFAULT_SCALE) {
        this.scaledValue = scaledValue;
        this._shift = shift;
    }

    public add(other: ScaledNumber): ScaledNumber {
        if (other._shift === this._shift) {
            return new ScaledNumber(this.scaledValue + other.scaledValue, this._shift);
        } else {
            let shift: number;
            let thisValue = this.scaledValue;
            let otherValue = other.scaledValue;
            if (other._shift < this._shift) {
                shift = this._shift;
                otherValue = otherValue << (this._shift - other._shift);
            } else {
                shift = other._shift;
                thisValue = thisValue << (other._shift - this._shift);
            }
            return new ScaledNumber(thisValue + otherValue, shift);
        }
    }

    public valueOf(): number {
        return this.scaledValue >> this._shift;
    }
}
