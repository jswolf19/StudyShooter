class KeyboardInput {
    public get leftPressed(): boolean {
        return this.isKeyPressed("ArrowLeft");
    }

    public get upPressed(): boolean {
        return this.isKeyPressed("ArrowUp");
    }

    public get rightPressed(): boolean {
        return this.isKeyPressed("ArrowRight");
    }

    public get downPressed(): boolean {
        return this.isKeyPressed("ArrowDown");
    }

    private isKeyPressed(key: string): boolean {
        return typeof this._keyStates[key] !== "undefined";
    }
    private readonly _keyStates: {[key: string]: boolean};

    public constructor() {
        this._keyStates = {};
        this._boundKeydownHandler = this.keydownHandler.bind(this);
        this._boundKeyupHandler = this.keyupHandler.bind(this);
    }

    public register(eventSource: GlobalEventHandlers): void {
        eventSource.addEventListener("keydown", this._boundKeydownHandler);
        eventSource.addEventListener("keyup", this._boundKeyupHandler);
    }

    public unregister(eventSource: GlobalEventHandlers): void {
        eventSource.removeEventListener("keydown", this._boundKeydownHandler);
        eventSource.removeEventListener("keyup", this._boundKeyupHandler);

        Object.keys(this._keyStates).forEach((key) => delete this._keyStates[key]);
    }

    private keydownHandler(e: KeyboardEvent): void {
        this._keyStates[e.code] = true;
    }
    private readonly _boundKeydownHandler;

    private keyupHandler(e: KeyboardEvent): void {
        delete this._keyStates[e.code];
    }
    private readonly _boundKeyupHandler;
}