export function isEmpty(nextWord) {
    return !nextWord;
}

export function isHiragana(nextWord) {
    return !(nextWord.match(/^[ぁ-んー　]*$/));
}
export function isContinuing(previousWord, nextWord) {
    return (nextWord.length > 0 &&
        previousWord.charAt(previousWord.length - 1) !== nextWord.charAt(0));
}

export function isUsed(previousWords, nextWord) {
    for (let i = 0; i < previousWords.length - 1; i++) {
        if(nextWord === previousWords[i]) {
          return true;
        }
    }
    return false;
}

export function isGameOver(nextWord) {
    return (nextWord.charAt(nextWord.length - 1) === "ん");
}

