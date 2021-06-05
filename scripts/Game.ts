class Game {
    private static readonly ZOOM_FACTOR: number = 2;

    public readonly SCREEN_SIZE: Size;

    public get FIELD_SIZE(): Size {
        return {
            width: this.SCREEN_SIZE.width * 2,
            height: this.SCREEN_SIZE.height * 2
        };
    }
    
    private readonly _ctx: CanvasRenderingContext2D;

    public constructor(canvas: HTMLCanvasElement) {
        this._ctx = canvas.getContext("2d");
        this.SCREEN_SIZE = {
            width: canvas.width / Game.ZOOM_FACTOR,
            height: canvas.height / Game.ZOOM_FACTOR
        };
    }
}
