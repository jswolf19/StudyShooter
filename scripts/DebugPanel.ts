class DebugPanel implements Drawable {
    private readonly _game: Game;

    public get projectileCount(): number {
        return this._game.drawables.filter((d) => d instanceof Projectile).length;
    }

    private get lines(): Array<string> {
        return [`Bullets: ${this.projectileCount}`];
    }

    private _visible: boolean;

    constructor(game: Game) {
        this._game = game;

        this._visible = false;
        this._game.addDrawable(this);
    }

    public show(): void {
        console.log(`show debug: ${this._visible ? 'already started' : 'starting'}`)
        this._visible = true;
    }

    isVisible(game: Game): boolean {
        return this._visible;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        let screen = this._game.screenBounds;

        ctx.font = "10px 'Impact'";
        ctx.fillStyle = "#ffffffcc";
        this.lines.forEach((ln, idx) => ctx.fillText(ln, screen.left + 2, screen.top + (10 * (idx + 1))));
    }

    update(game: Game): void {
    }
}