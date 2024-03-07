export class Vec2 {
    private readonly _x: number
    private readonly _y: number

    constructor(x: number, y: number) {
        this._x = x
        this._y = y
    }

    get x() {
        return this._x
    }

    get y() {
        return this._y
    }

    add(vec: Vec2) {
        return new Vec2(this._x + vec.x, this._y + vec.y)
    }

    substract(vec: Vec2) {
        return new Vec2(this._x - vec.x, this._y - vec.y)
    }
}
