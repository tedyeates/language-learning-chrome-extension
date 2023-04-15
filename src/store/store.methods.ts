import { learntLevel } from './store.constants'
import { Word, SeenWords } from './store.types'

const saveNewWord = (word: Word, seenWords: SeenWords) => {
    seenWords[word.value] = {...word, seenCount: 1, level: 0}
    chrome.storage.sync.set({'seenWords': seenWords})
}


const calculateLevel = (word: Word) => {
    return 0
}


const updateWord = (word: Word, seenWords: SeenWords) => {
    const seenWord = seenWords[word.value]
    
    if (!seenWord.seenCount) return

    let newValue =  {
        ...seenWord,
        seenCount: seenWord.seenCount + 1,
    }

    newValue.level = calculateLevel(newValue)

    chrome.storage.sync.set({'seenWords': {
        ...seenWords, 
        [word.value]: newValue
    }})
}


export const saveWord = async (word: Word) => {
    let seenWords = await chrome.storage.sync.get('seenWords')

    if (word.value in seenWords) {
        return updateWord(word, seenWords)
    }

    saveNewWord(word, seenWords)
}


export const getLearntWords = async () => {
    const seenWords = await chrome.storage.sync.get('seenWords')
    return seenWords.filter((seenWord: Word) => (
        seenWord.level && seenWord.level > learntLevel
    ))
}