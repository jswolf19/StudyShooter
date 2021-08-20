interface Weapon {
    update(game: Game, shipLocation: ScaledPoint, shoot: boolean): void;
}