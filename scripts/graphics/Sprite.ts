class Sprite {
    private readonly _bounds: Rectangle;

    private readonly _image: HTMLImageElement;

    public constructor(image: HTMLImageElement, bounds: Rectangle) {
        this._image = image;
        this._bounds = bounds;
    }

    public getBoundsCenteredAt(location: Point): Rectangle {
        let topLeft: Point;
        if(Sprite.isScaledPoint(location)) {
            topLeft = location.offset({
                x: new ScaledNumber(-this._bounds.width, 1),
                y: new ScaledNumber(-this._bounds.height, 1)
            });
        } else {
            topLeft = {
                x: location.x - (this._bounds.width/2),
                y: location.y - (this._bounds.height/2)
            };
        }
        return new Rectangle(topLeft, this._bounds as Size);        
    }
    private static isScaledPoint(obj: Point): obj is ScaledPoint {
        return typeof (obj as ScaledPoint).offset !== "undefined";
    }

    public draw(ctx: CanvasDrawImage, location: Point): void {
        let target: Rectangle = this.getBoundsCenteredAt(location);
        ctx.drawImage(this._image, this._bounds.left, this._bounds.top, this._bounds.width, this._bounds.height,
                      target.left, target.top, target.width, target.height);
    }
}