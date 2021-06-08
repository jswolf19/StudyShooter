class SpriteLoader {
    private readonly _sprites: HTMLImageElement;

    public get Loaded(): boolean {
        return this._sprites.complete;
    }

    public get Error(): Error {
        return this._err;
    }
    private _err: Error;

    public constructor(url: string) {
        this._err = null;
        this._sprites = new Image();
        this._sprites.onerror = (e, source, lineno, colno, error) => this._err = error || new Error("error");
        this._sprites.src = url;
    }

    public registerLoadHandler(handler: (this: GlobalEventHandlers, ev: Event) => void): void {
        if(this.Error !== null) {
            throw this.Error;
        }

        if(this.Loaded) {
            handler.call(this._sprites, new Event("onload"));
        } else {
            let loadHandler: (this: GlobalEventHandlers, ev: Event) => void;
            if(!this._sprites.onload) {
                loadHandler = handler;
            } else {
                let curHandler: (this: GlobalEventHandlers, ev: Event) => void = this._sprites.onload;
                loadHandler = function(ev) {
                    curHandler.call(this, ev);
                    handler.call(this, ev);
                } 
            }
            this._sprites.onload = loadHandler;
        }
    }
}