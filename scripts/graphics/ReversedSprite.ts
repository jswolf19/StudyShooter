class ReversedSprite implements Sprite {
    private readonly _base: Sprite;
    private readonly _transformCanvas: HTMLCanvasElement;

    public constructor(base: Sprite) {
        this._base = base;
        this._transformCanvas = document.createElement("canvas");
    }

    public getBoundsCenteredAt(location: Point): Rectangle {
        return this._base.getBoundsCenteredAt(location);
    }

    public draw(ctx: CanvasDrawImage, location: Point): void {
        let bounds = this.getBoundsCenteredAt(location);

        let spriteBounds = this.getBoundsCenteredAt({x:0, y:0});

        this._transformCanvas.width = spriteBounds.width;
        this._transformCanvas.height = spriteBounds.height;
        
        let transformCtx = this._transformCanvas.getContext("2d");
        transformCtx.translate(0, spriteBounds.height);
        transformCtx.scale(1, -1);
        this._base.draw(transformCtx, {x: -spriteBounds.left, y: -spriteBounds.top});

        ctx.drawImage(
            this._transformCanvas,
            0, 0, spriteBounds.width, spriteBounds.height,
            bounds.left, bounds.top, bounds.width, bounds.height
        )
    }
}
