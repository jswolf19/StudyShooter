interface Drawable {
    isVisible(game: Game): boolean;
    draw(ctx: CanvasRenderingContext2D): void;
    update(game: Game): void;
}