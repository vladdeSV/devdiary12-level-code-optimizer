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
