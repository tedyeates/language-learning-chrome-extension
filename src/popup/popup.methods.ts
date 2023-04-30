import { viewTranslationTemplate } from "./popup.template"
import { ReplacementMapping, Translation } from "./popup.types"

const clickViewTranslation = (value: string, index: number) => {
    const popup = document.getElementById(`thl-popup-${index}`)
    
    if (!popup) return

    popup.innerHTML = viewTranslationTemplate(value)
    console.log("popup: " + value)
}


const informationPopup = (
    originalWord: string, 
    index: number
) => {
    const viewTranslationContent = document.createTextNode("view translation")
    const viewTranslation = document.createElement("button")

    viewTranslation.setAttribute("class", "thl-popup-word")
    viewTranslation.append(viewTranslationContent)
    viewTranslation.onclick = () => clickViewTranslation(originalWord, index)
    
    const popup = document.createElement("div")

    popup.setAttribute("class", "thl-popup")
    popup.setAttribute("id", `thl-popup-${index}`)
    popup.append(viewTranslation)

    return popup
}


const getReplacementMapping = (words: Array<Translation>) => {
    return words.reduce((replacementMapping, word) => {
        return {...replacementMapping, [word.value]: word.translation}
    }, {})
}


export const addInformationPopups = (words: Array<Translation>) => {
    const replacementMapping: ReplacementMapping = getReplacementMapping(words)
    const highlightedElements = document.getElementsByClassName('thl-underline')

    for (let index = 0;  index < highlightedElements.length; index++) {
        const element = highlightedElements[index] as HTMLElement
        console.log(element.innerText.trim())
        const translation = replacementMapping[element.innerText.trim()]
        
        const popup = informationPopup(element.innerText.trim(), index) 

        element.innerText = translation
        element.append(popup)
    }
}


export default {
    addInformationPopups
}