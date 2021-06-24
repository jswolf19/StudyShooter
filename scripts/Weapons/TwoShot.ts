class TwoShot implements Weapon {
    private readonly _shootCooldownFrames = 3;
    private _cooldownCounter: number = 0;
    private readonly _maxAmmo = 8;
    private _curAmmo: number = this._maxAmmo;
    private readonly _reloadFrames = 20;
    private _reloadCounter: number = 0;

    public update(game: Game, shipLocation: ScaledPoint, shoot: boolean): void {
        if(shoot && this._cooldownCounter === 0 && this._curAmmo > 0) {
            this.addProjectiles(game, shipLocation);
            this._curAmmo--;
            this._cooldownCounter = this._shootCooldownFrames;
            this._reloadCounter = this._reloadFrames;
        } else {
            if(this._cooldownCounter > 0) {
                this._cooldownCounter--;
            }
            if(this._reloadCounter === 0) {
                this._curAmmo = this._maxAmmo;
            } else if(this._reloadCounter > 0) {
                this._reloadCounter--;
            }
        }
    }

    private addProjectiles(game: Game, shipLocation: ScaledPoint): void {
        game.addDrawable(new Projectile(
            game.spriteLoader.getSprite(Rectangle.from({ x: 101, y: 10},　{x: 104, y: 16})),
            shipLocation.offset({x: ScaledNumber.from(-4), y: ScaledNumber.from(-10)}),
            { x: ScaledNumber.from(0), y: ScaledNumber.from(-8)}
        ));
        game.addDrawable(new Projectile(
            game.spriteLoader.getSprite(Rectangle.from({ x: 101, y: 10},　{x: 104, y: 16})),
            shipLocation.offset({x: ScaledNumber.from(4), y: ScaledNumber.from(-10)}),
            { x: ScaledNumber.from(0), y: ScaledNumber.from(-8)}
        ));
    }
}