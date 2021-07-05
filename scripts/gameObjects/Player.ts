class Player implements Drawable {
    public get location(): Point {
        return this._location;
    }
    private _location: ScaledPoint;
    private _maxSpeed: ScaledNumber;

    private readonly _shootCooldownFrames = 4;
    private _cooldownCounter: number = 0;
    private readonly _maxAmmo = 4;
    private _curAmmo: number = this._maxAmmo;
    private readonly _reloadFrames = 20;
    private _reloadCounter: number = 0;

    private get sprite(): Sprite {
        return this._sprites[this._currentSpriteIdx.valueOf()];
    }
    private readonly _sprites: Array<Sprite>;

    private _currentSpriteIdx: ScaledNumber;
    private readonly _spriteRestState: ScaledNumber;

    private shiftSpriteIndex(direction: "left" | "right" | "center"): void {
        const spriteIncrement = new ScaledNumber(1, 2);
        let offset: ScaledNumber | number = 0;
        switch(direction) {
            case "left": {
                offset = spriteIncrement.negate();
                break;
            }
            case "right": {
                offset = spriteIncrement;
                break;
            }
            case "center": {
                switch(this._currentSpriteIdx.compareTo(this._spriteRestState)) {
                    case 1: {
                        offset = spriteIncrement.negate();
                        break;
                    }
                    case -1: {
                        offset = spriteIncrement;
                        break;
                    }
                }
                break;
            }
        }
        let candidate = this._currentSpriteIdx.add(offset);
        if(candidate.compareTo(0) >= 0 && candidate.compareTo(this._sprites.length) < 0) {
            this._currentSpriteIdx = candidate;
        }
    }

    public constructor(location: ScaledPoint, spriteLoader: SpriteLoader) {
        this._location = location;
        this._maxSpeed = ScaledNumber.from(2);

        this._sprites = [
            spriteLoader.getSprite(Rectangle.from({x: 0, y: 0}, {x: 29, y: 35})),
            spriteLoader.getSprite(Rectangle.from({x: 31, y: 0}, {x: 69, y: 35})),
            spriteLoader.getSprite(Rectangle.from({x: 71, y: 0}, {x: 99, y: 35})),
        ];
        this._spriteRestState = new ScaledNumber(3<<1, 2);
        this._currentSpriteIdx = this._spriteRestState;
    }

    public isVisible(game: Game): boolean {
        return true;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        this.sprite.draw(ctx, this._location);
    }

    public update(game: Game): void {
        let newLocation: ScaledPoint = this._location;
        if(game.keyboardInput.leftPressed && !game.keyboardInput.rightPressed) {
            newLocation = newLocation.offset({x: this._maxSpeed.negate(), y: ScaledNumber.from(0)});
            this.shiftSpriteIndex("left");
        } else if(game.keyboardInput.rightPressed && !game.keyboardInput.leftPressed) {
            newLocation = newLocation.offset({x: this._maxSpeed, y: ScaledNumber.from(0)});
            this.shiftSpriteIndex("right");
        } else if(!game.keyboardInput.leftPressed && !game.keyboardInput.rightPressed) {
            this.shiftSpriteIndex("center");
        }

        if(newLocation.x >= 0 && newLocation.x < game.FIELD_SIZE.width) {
            this._location = newLocation;
        } else {
            newLocation = this._location;
        }

        if(game.keyboardInput.upPressed) {
            newLocation = newLocation.offset({x: ScaledNumber.from(0), y: this._maxSpeed.negate()});
        }
        if(game.keyboardInput.downPressed) {
            newLocation = newLocation.offset({x: ScaledNumber.from(0), y: this._maxSpeed});
        }
        if(newLocation.y >= 0 && newLocation.y < game.FIELD_SIZE.height) {
            this._location = newLocation;
        }

        if(game.keyboardInput.shootPressed && this._cooldownCounter === 0 && this._curAmmo > 0) {
            this.addProjectiles(game);
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

    private addProjectiles(game: Game): void {
        game.addDrawable(new Projectile(
            game.spriteLoader.getSprite(Rectangle.from({ x: 101, y: 0},　{x: 104, y: 8})),
            this._location.offset({x: ScaledNumber.from(-10), y: ScaledNumber.from(-4)}),
            { x: new ScaledNumber(-1, 2), y: ScaledNumber.from(-8)}
        ));
        game.addDrawable(new Projectile(
            game.spriteLoader.getSprite(Rectangle.from({ x: 101, y: 10},　{x: 104, y: 16})),
            this._location.offset({x: ScaledNumber.from(-4), y: ScaledNumber.from(-10)}),
            { x: ScaledNumber.from(0), y: ScaledNumber.from(-8)}
        ));
        game.addDrawable(new Projectile(
            game.spriteLoader.getSprite(Rectangle.from({ x: 101, y: 10},　{x: 104, y: 16})),
            this._location.offset({x: ScaledNumber.from(4), y: ScaledNumber.from(-10)}),
            { x: ScaledNumber.from(0), y: ScaledNumber.from(-8)}
        ));
        game.addDrawable(new Projectile(
            game.spriteLoader.getSprite(Rectangle.from({ x: 101, y: 0},　{x: 104, y: 8})),
            this._location.offset({x: ScaledNumber.from(10), y: ScaledNumber.from(-4)}),
            { x: new ScaledNumber(1, 2), y: ScaledNumber.from(-8)}
        ));
    }
}