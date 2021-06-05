class Game {
    private static readonly ZOOM_FACTOR: number = 2;
    private static readonly STAR_CNT = 300;

    public readonly SCREEN_SIZE: Size;

    public get FIELD_SIZE(): Size {
        return {
            width: this.SCREEN_SIZE.width * 2,
            height: this.SCREEN_SIZE.height * 2
        };
    }
    
    private readonly _ctx: CanvasRenderingContext2D;

    private readonly _stars: Array<Star>;

    public constructor(canvas: HTMLCanvasElement) {
        this._ctx = canvas.getContext("2d");
        this.SCREEN_SIZE = {
            width: canvas.width / Game.ZOOM_FACTOR,
            height: canvas.height / Game.ZOOM_FACTOR
        };
        this._stars = new Array<Star>(Game.STAR_CNT);
    }

    public init(): void {
        for (let i = 0; i < Game.STAR_CNT; i++) {
            this._stars[i] = new Star(this);
        }
    }

    public draw(): void {
        this._ctx.fillStyle = "black";
        this._ctx.fillRect(0, 0, this.SCREEN_SIZE.width, this.SCREEN_SIZE.height);
        this._stars.forEach((star) => star.draw(this._ctx));
    }
}
