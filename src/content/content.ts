import { workerData } from 'worker_threads'
import { Word } from './types'

import { textReplacements } from './textReplacements'

const saveNewWord = async (word: Word) => {
    let seenWords = await chrome.storage.sync.get('seenWords')
    seenWords.push(word)
    chrome.storage.sync.set({'seenWords': seenWords})
}

const getSeenWords = () => {
    return chrome.storage.sync.get('seenWords')
}

const getLearntWords = async (level: number) => {
    const seenWords = await getSeenWords()
    return seenWords.filter((seenWord: Word) => {
        seenWord.level > level
    })
}


function isHidden(element:HTMLElement):boolean {
    return (element.offsetParent === null)
}


const sortWords = (
    text: string, 
    excludeWords: Set<string>, 
    words: Set<string>
) => {
    text.split(/\s+/).some((word: string) => {   
        if (!excludeWords.has(word) && word.length > 2) {
            words.add(word)
        }
        return words.size >= numberWordsToGet
    })

    return words
}


const cleanText = (text: string) => {
    console.log(text)
    console.log(textReplacements)
    return text.replace(textReplacements, ' ').toLowerCase()
}


const numberWordsToGet = 100
const getUntranslatedWords = (excludeWords: Set<string>) => {
    const paragraphs = [...document.getElementsByTagName("p")]
    let words: Set<string> = new Set()
    paragraphs.filter((value) => !isHidden(value)).some((paragraph) => {
        const cleanedText = cleanText(paragraph.innerHTML)
        console.log(cleanedText)
        words = sortWords(cleanedText, excludeWords, words)

        return words.size >= numberWordsToGet
    })

    console.log(words)
}


const pickNewWord = (excludeWords: Set<string>) => {
    getUntranslatedWords(excludeWords)
}


const replaceWords = async () => {
    const learntWords = await getSeenWords()
    learntWords?.forEach((word: Word) => {
        document.body.innerHTML = document.body.innerHTML.replaceAll(word.value, word.translation)
    })

}

console.log("hello")
pickNewWord(new Set())