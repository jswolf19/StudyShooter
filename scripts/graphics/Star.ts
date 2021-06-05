class Star {
    private _location: Point;
    private _size: number;

    constructor(game: Game) {
        this._location = {
            x: rand(0, game.FIELD_SIZE.width),
            y: rand(0, game.FIELD_SIZE.height)
        };
        this._size = rand(1, 2);
    }
    
    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = rand(0, 2) !== 0 ? "#66f" : "#8af";
        ctx.fillRect(this._location.x, this._location.y, this._size, this._size);
    }
}