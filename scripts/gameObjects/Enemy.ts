class Enemy implements Drawable {
    private readonly _sprite: Sprite;
    private _location: ScaledPoint;

    public constructor(spriteLoader: SpriteLoader, location: ScaledPoint) {
        this._sprite = spriteLoader.getSprite(1, Rectangle.from({ x: 32, y: 0},　{x: 63, y: 31}));
        this._location = location;
    }

    isVisible(game: Game): boolean {
        return game.isVisible(this._sprite.getBoundsCenteredAt(this._location));
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this._sprite.draw(ctx, this._location);
    }

    update(game: Game): void {
        let fieldBounds = new Rectangle({x: 0, y: 0}, game.FIELD_SIZE);

        if(!fieldBounds.hasOverlap(this._sprite.getBoundsCenteredAt(this._location))) {
            game.deleteDrawable(this);
        }
    }
}