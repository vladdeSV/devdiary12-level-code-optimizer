import {Level} from "./level.js";

function init() {
    let button = document.querySelector('#js-button-optimize');
    let input = document.querySelector('#js-level-code')
    let output = document.querySelector('#js-level-code-output')

    input.focus();

    button.addEventListener('click', () => {
        output.value = optimizeLevelCode(input.value)
    });
}

function optimizeLevelCode(levelCode) {
    levelCode = levelCode.trim()

    if (!RegExp('^[A-Z]+9[A-Zsn0-9]*$').test(levelCode)) {
        return 'invalid level code';
    }

    let optimizedLevelCode;
    try {
        let level = Level.fromLevelCode(levelCode);
        optimizedLevelCode = level.toLevelCode();
    } catch (error) {
        optimizedLevelCode = 'unknown error encountered'
    }

    return optimizedLevelCode;
}

document.addEventListener('DOMContentLoaded', init);

//console.log(Level.fromLevelCode('A916P0A1P0A1C0J1G0J1C0A1C0J1C0A1C0J1C0A1C0D9F1C0A1P0A1P0Q').toLevelCode());
//console.log(Level.fromLevelCode('A906ZZ1A07A6ZZZF9ZE').toLevelCode());

/*
let s = ""
tiles.forEach(function (tile, index) {

    if (index && index % 16 === 0) {

        // just to make sure firefox doesn't group console logs together
        for (let i = 0; i < index; i++) {
            s += " "
        }

        console.log(s)
        s = "";
    }

    s += tile.shape
    //s += " "

})
if (s !== "") {
    console.log(s)
}
*/