function rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

interface Size {
    readonly width: number;
    readonly height: number;
}

interface Point {
    readonly x: number;
    readonly y: number;
}

class Rectangle {
    public static from(topLeft: Point, bottomRight: Point) {
        return new Rectangle(topLeft, {width: bottomRight.x - topLeft.x + 1, height: bottomRight.y - topLeft.y + 1});
    }

    public get left(): number {
        return this._location.x;
    }

    public get top(): number {
        return this._location.y;
    }

    public get right(): number {
        return this.left + this.width;
    }

    public get bottom(): number {
        return this.top + this.height;
    }

    public get width(): number {
        return this._size.width;
    }

    public get height(): number {
        return this._size.height;
    }

    private readonly _location: Point;
    private readonly _size: Size;
    
    public constructor(location: Point, size: Size) {
        this._location = location;
        this._size = size;
    }
}

class ScaledPoint implements Point {
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

    public add(other: ScaledNumber | number): ScaledNumber {
        let n = this.normalize(other);
        return new ScaledNumber(n.thisValue + n.otherValue, n.shift);
    }

    public negate(): ScaledNumber {
        return new ScaledNumber(-this.scaledValue, this._shift);
    }

    public compareTo(other: ScaledNumber | number): -1 | 0 | 1 {
        let n = this.normalize(other);
        if(n.thisValue < n.otherValue) {
            return -1;
        } else if(n.thisValue > n.otherValue) {
            return 1;
        } else {
            return 0;
        }
    }

    private normalize(other: ScaledNumber | number): { thisValue: number, otherValue: number, shift: number } {
        let shift: number = this._shift;
        let thisValue: number = this.scaledValue;
        let otherValue: number;
        if(typeof other === "number") {
            otherValue = other<<this._shift; 
        } else {
            otherValue = other.scaledValue;
            if (other._shift <= this._shift) {
                otherValue = otherValue << (this._shift - other._shift);
            } else {
                shift = other._shift;
                thisValue = thisValue << (other._shift - this._shift);
            }
        }
        return { thisValue, otherValue, shift };
    }

    public valueOf(): number {
        return this.scaledValue >> this._shift;
    }
}
