class Star implements Drawable {
    private _location: ScaledPoint;
    private _speed: ScaledVector;

    private get bounds(): Rectangle {
        return new Rectangle(this._location, {
            width: this._size,
            height: this._size
        });
    }
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

    public isVisible(game: Game): boolean {
        return game.isVisible(this.bounds);
    }
    
    public draw(ctx: CanvasRenderingContext2D): void {
        let bounds = this.bounds;
        ctx.fillStyle = rand(0, 2) !== 0 ? "#66f" : "#8af";
        ctx.fillRect(bounds.left, bounds.top, bounds.width, bounds.height);
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