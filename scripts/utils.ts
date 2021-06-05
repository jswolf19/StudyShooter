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
