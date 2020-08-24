# *Bunker Bustin'* Level Code Optimizer
Optimizes level codes for Yahtzee's Dev Diary 12 game *Bunker Bustin'*.

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
