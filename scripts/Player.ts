class Player implements Drawable {
    private _location: ScaledPoint;
    private readonly _sprites: Array<Sprite>;

    public constructor(location: ScaledPoint, spriteLoader: SpriteLoader) {
        this._location = location;
        this._sprites = [
            spriteLoader.getSprite(Rectangle.from({x: 0, y: 0}, {x: 29, y: 35})),
            spriteLoader.getSprite(Rectangle.from({x: 31, y: 0}, {x: 69, y: 35})),
            spriteLoader.getSprite(Rectangle.from({x: 71, y: 0}, {x: 99, y: 35})),
        ];
    }

    public isVisible(game: Game): boolean {
        return true;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        this._sprites[1].draw(ctx, this._location);
    }

    public update(game: Game): void {
    }
}