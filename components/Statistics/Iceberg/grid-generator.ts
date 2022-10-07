import { StyleValue } from "nuxt/dist/app/compat/capi";


export default class GridGenerator {
    size: number;
    squares: Square[];

    constructor(size: number) {
        this.size = size;
        this.squares = [];
    }

    getNext(y: number): StyleValue {
        const percentOptions = [...Array(100 - this.size).keys()];

        let x: number | null = null;

        while (percentOptions.length) {
            const index = Math.floor(Math.random() * percentOptions.length); // random index
            // let index = 0;  // grid-index
            const xPercent = percentOptions.splice(index, 1)[0]; // pop index
            const square = new Square(xPercent, y, this.size);
            if (this.isFree(square)) {
                this.squares.push(square);
                x = xPercent;
                break;
            }
        }

        if (x === null) {
            console.warn("Hidden");
            // don't know
            return { display: "none" };
        }

        return {
            left: `${x}%`,
            bottom: `${y}%`,
        };
    }

    isFree(squareA: Square): boolean {
        for (const squareB of this.squares) {
            if (squareB.overlaps(squareA)) { return false; }
        }
        return true;
    }
}

class Square {
    top: number;
    right: number;
    bottom: number;
    left: number;

    // x and y are in percent (0-100)
    constructor(x: number, y: number, size: number) {
        this.left = x;
        this.right = x + size;
        this.top = y + size;
        this.bottom = y;
    }

    overlaps(other: Square): boolean {
        const isWithinX = this.left <= other.right && this.right >= other.left;
        const isWithinY = this.top >= other.bottom && this.bottom <= other.top;
        return isWithinX && isWithinY;
    }
}
