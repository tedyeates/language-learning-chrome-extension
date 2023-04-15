import { Word } from "../store/store.types"
import { ReplacementMapping } from "./pageediting.types";


const informationPopup = (translationText: string, word: Word) => {
    return `${translationText}
        <div class="thl-popup>
            <span class="thl-popup-language>English</span>
            <span class="thl-popup-word">${word.value}</span>
            <span class="thl-popup-level">${word.level}</level>
        </div>
    "`
}


const highlightTranslation = (translatedText: string) => {
    return `<span class='thl-underline'>${translatedText}</span>`
}


const addDecorationToTranslation = (translatedWord: Word) => {
    return highlightTranslation(informationPopup(
        translatedWord.translation, translatedWord
    ))
}


const replaceWithTranslation = (
    text: string, 
    replacementMappings: ReplacementMapping
) => {
    console.log(replacementMappings)
    var re = new RegExp(
        `\\b(?:${Object.keys(replacementMappings).join("|")})\\b`
        ,"gi"
    )

    return text.replace(re, (matched) => {
        return addDecorationToTranslation(
            replacementMappings[matched.toLowerCase()]
        )
    })
}


export const getReplacementMapping = (words: Array<Word>) => {
    return words.reduce((replacementMapping, word) => {
        return {...replacementMapping, [word.value]: word}
    }, {})
}


export const replaceWords = (
    wordsToReplace: ReplacementMapping, 
    elements: Array<HTMLElement>
) => {
    elements.forEach((element) => {
        element.innerHTML = replaceWithTranslation(
            element.innerText, 
            wordsToReplace
        )
    })
}

export default {
    getReplacementMapping,
    replaceWords
}