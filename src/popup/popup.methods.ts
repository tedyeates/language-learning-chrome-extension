import { Word } from "../store/store.types"
import PopupTemplates from "./popup.template"
import { ReplacementMapping, Translation } from "./popup.types"


const informationPopup = (
    originalWord: Word
) => {
    const templates = new PopupTemplates()
    templates.setupMainView()
    templates.setupTranslationButton(originalWord)
    templates.setupCloseButton()

    return templates.popup
}


const getReplacementMapping = (words: Array<Translation>) => {
    return words.reduce((replacementMapping, word) => {
        return {...replacementMapping, [word.value]: word}
    }, {})
}


export const addInformationPopups = (words: Array<Translation>) => {
    const replacementMapping: ReplacementMapping = getReplacementMapping(words)
    const highlightedElements = document.getElementsByClassName('thl-underline')

    for (let index = 0;  index < highlightedElements.length; index++) {
        const element = highlightedElements[index] as HTMLElement
        console.log(element.innerText.trim())
        const translation = replacementMapping[element.innerText.trim()]
        
        const popup = informationPopup(translation) 

        element.innerText = translation.translation
        element.append(popup)
    }
}


export default {
    addInformationPopups
}