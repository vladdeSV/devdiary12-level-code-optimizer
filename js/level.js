export class Level {
    /**
     * @param {number} bulletCount
     * @param {Tile[]} tiles
     */
    constructor(bulletCount, tiles) {
        this.bulletCount = bulletCount;
        this.tiles = tiles;
    }

    /**
     * @return {string}
     */
    toLevelCode() {
        let levelString = '';

        let currentCount = 0;
        let currentShape = Shape.empty;
        let currentMaterial = Material.block;
        this.tiles.forEach((value) => {

            if (value.character !== null) {
                if (currentCount > 0) {
                    levelString += letterFromNumber(currentCount);
                }
                currentCount = 0;

                levelString += value.character;
            }

            if (value.material !== currentMaterial || value.shape !== currentShape) {
                if (currentCount > 0) {
                    levelString += letterFromNumber(currentCount);
                }
                currentCount = 0;

                if (currentShape !== value.shape) {
                    levelString += value.shape;
                    currentShape = value.shape;
                }

                if (currentMaterial !== value.material) {
                    levelString += value.material
                    currentMaterial = value.material;
                }
            }

            ++currentCount;
        });

        if (currentShape !== Shape.empty) {
            levelString += letterFromNumber(currentCount);
        }

        return letterFromNumber(this.bulletCount) + '9' + levelString;
    }

    /**
     * @param {string} levelCode
     * @return {Level}
     */
    static fromLevelCode(levelCode) {

        // get the maximum bullet count
        let bulletBounceSeparatorIndex = levelCode.indexOf('9');

        let bulletBounceLetters = levelCode.substr(0, bulletBounceSeparatorIndex);
        let maxBulletBounceCount = 0;
        ;[...bulletBounceLetters].forEach(function (value) {
            maxBulletBounceCount += value.codePointAt(0) - 64
        })

        // remove part which mentions max bullet count, eg. 'A9'
        levelCode = levelCode.substr(bulletBounceSeparatorIndex + 1)

        let currentTile = new Tile();
        let tiles = []

        ;[...levelCode].forEach(function (character) {

            let letter = character;
            console.log("current letter is " + letter)

            let isShapeLetter = objectHasValue(Shape, letter)
            let isMaterialLetter = objectHasValue(Material, letter)
            let isCharacterLetter = objectHasValue(Character, letter)
            let isRepeatCountLetter = (!isShapeLetter && !isMaterialLetter && !isCharacterLetter)

            if (isShapeLetter && letter !== currentTile.shape) {
                console.log("setting shape to " + letter)
                currentTile.shape = letter

                return
            }

            if (isMaterialLetter && letter !== currentTile.material) {
                console.log("setting material to " + letter)
                currentTile.material = letter

                return
            }

            if (isCharacterLetter) {
                console.log("preparing to add character " + letter)
                currentTile.character = letter

                return
            }

            if (isRepeatCountLetter) {
                let letterValue = letter.codePointAt(0)

                console.log("adding " + (letterValue - 64) + " tiles");

                for (let i = 0; i < letterValue - 64; i++) {

                    let newTile = new Tile();
                    newTile.material = currentTile.material;
                    newTile.shape = currentTile.shape;
                    if (currentTile.character !== null) {
                        newTile.character = currentTile.character
                        currentTile.character = null
                    }

                    tiles.push(newTile)
                }

                return
            }

            throw 'Unknown letter ' + letter
        })

        // convert to 2d array for easier manipulation
        let tileCollection = [];
        tiles.forEach((value, index) => {
            let rowIndex = Math.trunc(index / 17);

            if (tileCollection[rowIndex] === undefined) {
                tileCollection[rowIndex] = [];
            }

            tileCollection[rowIndex].push(value);
        });

        // remove any row after the 9th row
        tileCollection = tileCollection.slice(0, 9);

        // change the out of bound tile to be the exact same as the
        tileCollection.forEach((value) => {
            value[16].shape = value[15].shape;
            value[16].material = value[15].material;
            value[16].character = null;
        });

        console.log(tileCollection);

        // convert back to 1d array
        tiles = [].concat(...tileCollection);

        // if tiles have no shape or material, set to default
        tiles.forEach((tile) => {
            if (tile.shape === null) {
                tile.shape = Shape.empty;
            }

            if (tile.material === null) {
                tile.material = Material.block;
            }
        });

        return new this(maxBulletBounceCount, tiles);
    }

    /**
     * @type {number}
     */
    bulletCount;

    /**
     * @type {Tile[]}
     */
    tiles;
}

class Tile {
    shape = null
    material = null
    character = null
}

const Shape = {
    empty: '0',
    block: '1',
    arrow_top_left: '2',
    arrow_top_right: '3',
    arrow_bottom_left: '4',
    arrow_bottom_right: '5',
}

const Material = {
    block: '6',
    grills: '7',
    shield: '8',
}

const Character = {
    player: '9',
    bad_dog: 's',
    good_dog: 'n',
}

/**
 * @param {*} obj
 * @param {*} val
 */
function objectHasValue(obj, val) {
    return Object.values(obj).includes(val);
}

/**
 * @param {int} number
 */
function letterFromNumber(number) {
    let ret = '';

    let a = 0;
    while (number > 26) {
        a++;
        number -= 26;
    }

    while (a--) {
        ret += 'Z'
    }

    ret += String.fromCharCode(64 + number);
    return ret;
}