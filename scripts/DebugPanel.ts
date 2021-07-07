class DebugPanel implements Drawable {
    private readonly _game: Game;

    public get projectileCount(): number {
        return this._game.drawables.filter((d) => d instanceof Projectile).length;
    }

    public get enemyCount(): number {
        return this._game.drawables.filter((d) => d instanceof Enemy).length;
    }

    public get fps(): number {
        return this._fps;
    }
    private _fps: number = 0;
    private _fpsCnt: number = 0;
    private _fpsStartTime: Date = new Date();

    private get lines(): Array<string> {
        return [
            `FPS: ${this._fps}`,
            `Bullets: ${this.projectileCount}`,
            `Enemies: ${this.enemyCount}`
        ];
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
        this._fpsCnt++;
        let fpsElapsed = Date.now() - this._fpsStartTime.getTime();

        if(fpsElapsed >= 400) {
            this._fps = Math.round(this._fpsCnt * 100000 / fpsElapsed)/100;
            this._fpsCnt = 0;
            this._fpsStartTime = new Date(this._fpsStartTime.getTime() + fpsElapsed);
        }
    }
}