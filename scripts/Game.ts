class Game {
    private static readonly ZOOM_FACTOR: number = 2;
    private static readonly STAR_CNT = 300;
    private static readonly GAME_SPEED = 1000 / 60;

    public get CAMERA_LOCATION(): ScaledPoint {
        return new ScaledPoint(
            ScaledNumber.from(0),
            ScaledNumber.from(0)
        )
    }

    public readonly SCREEN_SIZE: Size;

    public get FIELD_SIZE(): Size {
        return {
            width: this._vcanvas.width,
            height: this._vcanvas.height
        };
    }
    
    private readonly _ctx: CanvasRenderingContext2D;

    private readonly _vcanvas: HTMLCanvasElement;
    private readonly _vctx: CanvasRenderingContext2D;
    private _loopHandle: number;

    private readonly _stars: Array<Star>;

    public constructor(canvas: HTMLCanvasElement) {
        this._ctx = canvas.getContext("2d");
        this.SCREEN_SIZE = {
            width: canvas.width / Game.ZOOM_FACTOR,
            height: canvas.height / Game.ZOOM_FACTOR
        };
        this._stars = new Array<Star>(Game.STAR_CNT);
        this._loopHandle = null;

        this._vcanvas = document.createElement("canvas");
        this._vcanvas.width = this.SCREEN_SIZE.width * 2;
        this._vcanvas.height = this.SCREEN_SIZE.height * 2;
        this._vctx = this._vcanvas.getContext("2d");
    }

    public start(): void {
        if(this._loopHandle !== null) {
            throw new Error("already started.");
        }

        for (let i = 0; i < Game.STAR_CNT; i++) {
            this._stars[i] = new Star(this);
        }

        this._loopHandle = setInterval(() => this.gameLoop(), Game.GAME_SPEED);
    }

    public isVisible(location: ScaledPoint, size: Size = { width: 0, height: 0 }): boolean {
        return location.x < this.CAMERA_LOCATION.x + this.SCREEN_SIZE.width &&
                location.x + size.width >= this.CAMERA_LOCATION.x && 
                location.y < this.CAMERA_LOCATION.y + this.SCREEN_SIZE.height &&
                location.y + size.height >= this.CAMERA_LOCATION.y; 
    }

    private gameLoop(): void {
        this._stars.forEach((star) => star.update(this));

        this.draw(this._vctx);

        this._ctx.drawImage(
            this._vcanvas, 
            this.CAMERA_LOCATION.x, this.CAMERA_LOCATION.y, this.SCREEN_SIZE.width, this.SCREEN_SIZE.height,
            0, 0, this._ctx.canvas.width, this._ctx.canvas.height
        );
    }

    private draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.SCREEN_SIZE.width, this.SCREEN_SIZE.height);
        this._stars.filter((star) => star.isVisible(this))
                   .forEach((star) => star.draw(ctx));
    }
}
