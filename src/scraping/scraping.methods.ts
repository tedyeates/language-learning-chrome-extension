import axios from 'axios'

import { textReplacements, numberWordsToGet } from './scraping.constants'

function isHidden(element:HTMLElement) {
    return element.offsetParent === null
}


export const getVisibleParagraphsOnPage = () => {
    const paragraphs = [...document.getElementsByTagName("p")]
    return paragraphs.filter((value) => !isHidden(value))
}


export const cleanText = (text: string) => {
    return text.replace(textReplacements, ' ').toLowerCase()
}


export const combineElementText = (elements: Array<HTMLElement>) => {
    return elements.reduce((text, element) => {
        const cleanedText = cleanText(element.innerHTML)
        return `${text} ${cleanedText}`
    }, "")
}


const checkValidWord = async (word: string) => {
    return axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    ).then((response) => {
        return true
    }).catch((error) => {
        return false
    })
}


export const removeUselessWords = async (text: string) => {
    let wordsFound: Set<string> = new Set()
    let words: Array<string> = []
    
    for (const word of text.split(/\s+/)) {
        if (!wordsFound.has(word) && word.length > 2 && await checkValidWord(word)) {
            wordsFound.add(word)
            words.push(word)
        }

        if (words.length >= numberWordsToGet) break
    }

    return words
}


export default {
    getVisibleParagraphsOnPage,
    cleanText,
    removeUselessWords,
    combineElementText
}
