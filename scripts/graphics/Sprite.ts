class Sprite {
    private readonly _bounds: Rectangle;

    private readonly _image: HTMLImageElement;

    public constructor(image: HTMLImageElement, bounds: Rectangle) {
        this._image = image;
        this._bounds = bounds;
    }

    public getBoundsCenteredAt(location: Point): Rectangle {
        return new Rectangle({
                x: location.x - (this._bounds.width/2),
                y: location.y - (this._bounds.height/2)
            }, this._bounds as Size);        
    }

    public draw(ctx: CanvasDrawImage, location: Point): void {
        let target: Rectangle = this.getBoundsCenteredAt(location);
        ctx.drawImage(this._image, this._bounds.left, this._bounds.top, this._bounds.width, this._bounds.height,
                      target.left, target.top, target.width, target.height);
    }
}