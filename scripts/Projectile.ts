class Projectile implements Drawable {
    private readonly _sprite: Sprite;
    private _location: ScaledPoint;
    private readonly _speed: ScaledVector;

    public constructor(sprite: Sprite, location: ScaledPoint, speed: ScaledVector) {
        this._sprite = sprite;
        this._location = location;
        this._speed = speed;
    }

    isVisible(game: Game): boolean {
        return game.isVisible(this._sprite.getBoundsCenteredAt(this._location));
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this._sprite.draw(ctx, this._location);
    }

    update(game: Game): void {
        this._location = this._location.offset(this._speed);
    }
}