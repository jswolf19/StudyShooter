class Game {
    private static readonly ZOOM_FACTOR: number = 2;
    private static readonly STAR_CNT = 300;
    private static readonly GAME_SPEED = 1000 / 60;

    public get screenBounds(): Rectangle {
        return new Rectangle({x: 0, y: 0}, this._screenSize);
    }
    private readonly _screenSize: Size;

    public get FIELD_SIZE(): Size {
        return {
            width: this._vcanvas.width,
            height: this._vcanvas.height
        };
    }
    
    private readonly _sprites: SpriteLoader;
    private readonly _ctx: CanvasRenderingContext2D;

    private readonly _vcanvas: HTMLCanvasElement;
    private readonly _vctx: CanvasRenderingContext2D;
    private _loopHandle: number;

    private get drawables(): Array<Drawable> {
        return this._stars;
    }
    private readonly _stars: Array<Star>;

    public constructor(canvas: HTMLCanvasElement, sprites: SpriteLoader) {
        this._sprites = sprites;

        this._ctx = canvas.getContext("2d");
        this._screenSize = {
            width: canvas.width / Game.ZOOM_FACTOR,
            height: canvas.height / Game.ZOOM_FACTOR
        };
        this._stars = new Array<Star>(Game.STAR_CNT);
        this._loopHandle = null;

        this._vcanvas = document.createElement("canvas");
        this._vcanvas.width = this._screenSize.width * 2;
        this._vcanvas.height = this._screenSize.height * 2;
        this._vctx = this._vcanvas.getContext("2d");
    }

    public start(): void {
        if(this._loopHandle !== null) {
            throw new Error("already started.");
        }

        for (let i = 0; i < Game.STAR_CNT; i++) {
            this._stars[i] = new Star(this);
        }

        this._sprites.registerLoadHandler(() => this.startInternal());
    }

    private startInternal(): void {
        if(this._loopHandle === null && this._sprites.Loaded) {
            this._loopHandle = setInterval(() => this.gameLoop(), Game.GAME_SPEED);
        }
    }

    public isVisible(test: Point | Rectangle): boolean {
        let screenBounds = this.screenBounds;
        let testBounds: Rectangle = Game.isRectangle(test) ? test : new Rectangle(test, {width: 0, height: 0});

        return testBounds.left < screenBounds.right &&
                testBounds.right > screenBounds.left && 
                testBounds.top < screenBounds.bottom &&
                testBounds.bottom > screenBounds.top; 
    }
    private static isRectangle(obj: Point | Rectangle): obj is Rectangle {
        return typeof (obj as Rectangle).width !== "undefined";
    }

    private gameLoop(): void {
        let screenBounds = this.screenBounds;
 
        this.drawables.forEach((d) => d.update(this));

        this.draw(this._vctx);

        this._ctx.drawImage(
            this._vcanvas, 
            screenBounds.left, screenBounds.top, screenBounds.width, screenBounds.height,
            0, 0, this._ctx.canvas.width, this._ctx.canvas.height
        );
    }

    private draw(ctx: CanvasRenderingContext2D): void {
        let screenBounds = this.screenBounds;

        ctx.fillStyle = "black";
        ctx.fillRect(screenBounds.left, screenBounds.top, screenBounds.width, screenBounds.height);
        this.drawables.filter((d) => d.isVisible(this))
                      .forEach((d) => d.draw(ctx));
    }
}
