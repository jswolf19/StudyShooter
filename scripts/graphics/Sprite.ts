class Sprite {
    public readonly bounds: Rectangle;

    private readonly _image: HTMLImageElement;

    public constructor(image: HTMLImageElement, bounds: Rectangle) {
        this._image = image;
        this.bounds = bounds;
    }

    public draw(ctx: CanvasDrawImage, location: Point): void {
        ctx.drawImage(this._image, this.bounds.left, this.bounds.top, this.bounds.width, this.bounds.height,
                      location.x, location.y, this.bounds.width, this.bounds.height);
    }
}