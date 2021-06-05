class Star {
    private _location: ScaledPoint;
    private _speed: ScaledVector;
    private _size: number;

    constructor(game: Game) {
        this._location = new ScaledPoint(
            ScaledNumber.rand(0, game.FIELD_SIZE.width),
            ScaledNumber.rand(0, game.FIELD_SIZE.height)
        );
        this._speed = {
            x: ScaledNumber.from(0),
            y: new ScaledNumber(rand(30, 200))
        }
        this._size = rand(1, 2);
    }
    
    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = rand(0, 2) !== 0 ? "#66f" : "#8af";
        ctx.fillRect(this._location.x, this._location.y, this._size, this._size);
    }

    public update(game: Game): void {
        this._location = this._location.offset(this._speed);
        if (this._location.y > game.FIELD_SIZE.height) {
            this._location = new ScaledPoint(
                ScaledNumber.rand(0, game.FIELD_SIZE.width),
                ScaledNumber.from(0)
            );
        }
    }
}