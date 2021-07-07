class SpriteLoader {
    private readonly _sprites: Array<HTMLImageElement>;

    public get Loaded(): boolean {
        return this._sprites.reduce((acc, s) => acc && s.complete, true);
    }

    private _loadHandlers: Array<(this: SpriteLoader, ev: Event) => void>;

    public get Errors(): Array<Error> {
        return this._errs;
    }
    private _errs: Array<Error>;

    public constructor(urls: Array<string>) {
        this._errs = [];
        this._loadHandlers = [];

        this._sprites = urls.map((url) => {
            let ret  = new Image();
            ret.onerror = (e, source, lineno, colno, error) => this._errs.push(error || new Error("error"));
            ret.onload = (e) => this.handleLoad();
            ret.src = url;

            return ret;
        });
    }

    public getSprite(group: number, rect: Rectangle): Sprite {
        return new Sprite(this._sprites[group], rect);
    }

    public registerLoadHandler(handler: (this: SpriteLoader, ev: Event) => void): void {
        if(this.Errors.length !== 0) {
            throw this.Errors[0];
        }

        if(this.Loaded) {
            this.onload(handler);
        } else {
            this._loadHandlers.push(handler);
        }
    }

    private onload(handler: (this: SpriteLoader, ev: Event) => void): void {
        handler.call(this, new Event("onload"));
    }

    private handleLoad(): void {
        if(this.Loaded) {
            this._loadHandlers.forEach((h) => this.onload(h));
            this._loadHandlers = [];
        }
    }
}