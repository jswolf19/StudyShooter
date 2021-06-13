class Player implements Drawable {
    private _location: ScaledPoint;
    private _maxSpeed: ScaledNumber;

    private get sprite(): Sprite {
        return this._sprites[this._currentSpriteIdx];
    }
    private readonly _sprites: Array<Sprite>;
    private _currentSpriteIdx: number;

    public constructor(location: ScaledPoint, spriteLoader: SpriteLoader) {
        this._location = location;
        this._sprites = [
            spriteLoader.getSprite(Rectangle.from({x: 0, y: 0}, {x: 29, y: 35})),
            spriteLoader.getSprite(Rectangle.from({x: 31, y: 0}, {x: 69, y: 35})),
            spriteLoader.getSprite(Rectangle.from({x: 71, y: 0}, {x: 99, y: 35})),
        ];
        this._currentSpriteIdx = 1;
        this._maxSpeed = ScaledNumber.from(2);
    }

    public isVisible(game: Game): boolean {
        return true;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        this.sprite.draw(ctx, this._location);
    }

    public update(game: Game): void {
        let newLocation: ScaledPoint = this._location;
        if(game.keyboardInput.leftPressed) {
            newLocation = newLocation.offset({x: this._maxSpeed.negate(), y: ScaledNumber.from(0)});
        }
        if(game.keyboardInput.upPressed) {
            newLocation = newLocation.offset({x: ScaledNumber.from(0), y: this._maxSpeed.negate()});
        }
        if(game.keyboardInput.rightPressed) {
            newLocation = newLocation.offset({x: this._maxSpeed, y: ScaledNumber.from(0)});
        }
        if(game.keyboardInput.downPressed) {
            newLocation = newLocation.offset({x: ScaledNumber.from(0), y: this._maxSpeed});
        }
        this._location = newLocation;
    }
}