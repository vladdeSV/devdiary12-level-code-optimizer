# *Bunker Bustin'* Level Code Optimizer
Optimizes level codes for Yahtzee's Dev Diary 12 game *Bunker Bustin'*.

## Optimizations
To understand what is being optimized, it is important to know how a level codes is generated, and what quirks exists in the level generation code. Yahtzee goes into great detail how the level code generation works in his [final installment of the first *Dev Diary* video series](https://youtu.be/a-n5wbeXCe8?t=101). However, it is never mentioned that the 16×9 level grid actually stored as a 17×10 grid. Optimizations can be performed due to this flaw.

In summary, here are the optimization strategies:
- Discard the last row of the level.
- Replace the last tile of each row to the tile before it.
- Ignore material changes if a tile is empty.
- Disregard the first material and/or shape for for the first tiles if they are of grey material and/or empty tiles.

## Example

Use the [website](https://bblco.vladde.me/) to optimize.

### DIY

If you want to yoink the JS code, then do the following:

```js
// your level code
let levelCode = 'A916P0A1P0A1P0A1C0J1C0A1C0J1C0A1C0J1C0A1C0D9CsC1C0A1P0A1P0Q'
let optimizedLevelCode = Level.fromLevelCode(levelCode).toLevelCode()

console.log(optimizedLevelCode) // 'A91ZZB0J1G0J1G0J1G0D9CsC1ZL'
```
